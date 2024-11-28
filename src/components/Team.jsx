import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const people = [
  {
    name: 'Anmol',
    role: 'Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    linkedin: 'https://www.linkedin.com/in/anmol-776877294/',
    instagram: 'https://www.instagram.com/i_am.anmol/',
  },
  {
    name: 'Ayush Thakur',
    role: 'Co-Founder',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    linkedin: 'https://www.linkedin.com/in/ayush-profile',
    instagram: 'https://www.instagram.com/realayushhoon/',
  },
  {
    name: 'Abhinav Tyagi',
    role: 'Co-Founder',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    linkedin: 'https://www.linkedin.com/in/abhinav-profile',
    instagram: 'https://www.instagram.com/_abhinavtyagi__/',
  },
  {
    name: 'Rahul Singh Bhist',
    role: 'Co-Founder',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    linkedin: 'https://www.linkedin.com/in/rahul-profile',
    instagram: 'https://www.instagram.com/singh_rahul.99/',
  },
  // More people...
];

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img alt={person.name} src={person.imageUrl} className="h-16 w-16 rounded-full" />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                  <div className="mt-4 flex space-x-4">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                      <FaLinkedinIn className="h-5 w-5" />
                    </a>
                    <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
