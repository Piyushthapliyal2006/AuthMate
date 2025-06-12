import axios from 'axios';
import { conf } from '@/conf/conf.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPlans = async () =>
  axios.get(`${conf.prodBaseUrl}/api/plans/`).then(res => res.data);

export const createOrder = async (plan_slug) =>
  axios.post(`${conf.prodBaseUrl}/api/order/create/`, { plan_slug }, { headers: getAuthHeaders() })
    .then(res => res.data);  // fixed path

export const verifyPayment = async (payload) =>
  axios.post(`${conf.prodBaseUrl}/api/subscription/verify/`, payload, { headers: getAuthHeaders() })
    .then(res => res.data);

export const getSubscriptions = async () =>
  axios.get(`${conf.prodBaseUrl}/api/subscriptions/`, { headers: getAuthHeaders() })
    .then(res => res.data);

export const getInvoices = async () =>
  axios.get(`${conf.prodBaseUrl}/api/invoices/`, { headers: getAuthHeaders() })
    .then(res => res.data);  // this one is already correct
