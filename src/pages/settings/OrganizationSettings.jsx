import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMail, FiTrash2, FiRefreshCw } from 'react-icons/fi';

const OrganizationSettings = () => {
  const [organization, setOrganization] = useState(null);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [message, setMessage] = useState('');
  const [orgName, setOrgName] = useState('');
  const [creating, setCreating] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const token = localStorage.getItem('accessToken');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchMembers = () => {
    if (!organization) return;
    setLoadingMembers(true);
    axios.get('/api/memberships/', { headers })
      .then(res => {
        const orgMembers = res.data.filter(m => m.organization === organization.name);
        setMembers(orgMembers);
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingMembers(false));
  };

  useEffect(() => {
    setLoadingOrg(true);
    axios.get('/api/organizations/', { headers })
      .then(res => setOrganization(res.data[0]))
      .catch(err => console.error(err))
      .finally(() => setLoadingOrg(false));
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [organization]);

  const createOrganization = async () => {
    setCreating(true);
    try {
      const response = await axios.post('/api/organizations/', { name: orgName }, { headers });
      setOrganization(response.data);
      setOrgName('');
      setMessage('Organization created successfully.');
    } catch {
      setMessage('Failed to create organization.');
    } finally {
      setCreating(false);
    }
  };

  const inviteMember = () => {
    if (!organization || !inviteEmail.trim()) {
      setMessage("Please enter an email and ensure organization is loaded.");
      return;
    }

    axios.post(`/api/memberships/${organization.id}/invite/`, { email: inviteEmail }, { headers })
      .then(res => {
        const newMember = {
          id: res.data.id,
          user: inviteEmail,
          email: inviteEmail,
          title: '',
          department: '',
          status: 'invited',
          role: 'member'
        };
        setMembers(prev => [...prev, newMember]);
        setMessage(`Invitation token generated: ${res.data.invitation_token}`);
      })
      .catch(err => {
        if (err.response?.data?.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Error inviting user.");
        }
      });

    setInviteEmail('');
  };

  const softDeleteOrg = () => {
    if (!organization) return;

    axios.delete(`/api/organizations/${organization.id}/soft_delete/`, { headers })
      .then(() => {
        setMessage("Organization marked as inactive.");
        setOrganization(null);
        setMembers([]);
      })
      .catch(() => setMessage("Failed to delete organization."));
  };

  const removeMember = (memberId) => {
    axios.delete(`/api/memberships/${memberId}/remove/`, { headers })
      .then(() => {
        setMembers(prev => prev.filter(m => m.id !== memberId));
        setMessage("Member removed successfully.");
      })
      .catch(() => setMessage("Failed to remove member."));
  };

  const resendInvite = (memberId) => {
    axios.post(`/api/memberships/${memberId}/resend_invite/`, {}, { headers })
      .then(res => {
        setMessage(`Invitation resent. New token: ${res.data.invitation_token}`);
      })
      .catch(() => setMessage("Failed to resend invitation."));
  };

  const isErrorMessage = (msg) =>
    msg.toLowerCase().includes('fail') ||
    msg.toLowerCase().includes('error') ||
    msg.toLowerCase().includes('required');

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = members.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(members.length / membersPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Organization Settings</h2>

      {loadingOrg ? (
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-300 animate-pulse">Loading organization...</div>
        </div>
      ) : !organization ? (
        <div className="space-y-4">
          <h3 className="text-xl text-gray-700 dark:text-gray-200">Create Organization</h3>
          <input
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            onClick={createOrganization}
            disabled={creating || !orgName}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <p className="text-lg text-gray-700 dark:text-gray-200"><strong>Name:</strong> {organization.name}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Owner:</strong> {organization.owner}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Created At:</strong> {new Date(organization.created_at).toLocaleString()}</p>
            <button
              onClick={softDeleteOrg}
              className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
            >
              <FiTrash2 className="w-5 h-5 mr-2" />
              Delete Organization
            </button>
          </div>

          <h3 className="text-xl text-gray-800 dark:text-gray-100 mb-2">Invite Member</h3>
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
            <input
              type="email"
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={inviteMember}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto flex items-center"
            >
              <FiMail className="w-5 h-5 mr-2" />
              Send Invite
            </button>
          </div>

          <div className="overflow-x-auto">
            {loadingMembers ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-300 animate-pulse">
                Loading members...
              </div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {currentMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-semibold">
                              {member.user?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{member.user}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{member.title || '—'}<br />{member.department || '—'}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300">
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{member.role}</td>
                        <td className="px-6 py-4 flex gap-4 text-sm">
                          <button onClick={() => removeMember(member.id)} className="text-red-600 dark:text-red-400 flex items-center">
                            <FiTrash2 className="w-4 h-4 mr-2" />
                            Remove
                          </button>
                          {member.status === 'invited' && (
                            <button onClick={() => resendInvite(member.id)} className="text-blue-600 dark:text-blue-400 flex items-center">
                              <FiRefreshCw className="w-4 h-4 mr-2" />
                              Resend Invite
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {message && (
        <p className={`mt-4 text-sm ${isErrorMessage(message) ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default OrganizationSettings;
