/**
 * API Service Layer
 *
 * All methods are stubs ready for real backend integration.
 * Replace the base URL and implement real HTTP calls when the backend is ready.
 * Credentials (API keys, tokens) must be set through the Admin Panel System Config.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api'

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authService = {
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  forgotPassword: (email: string) =>
    request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
}

// ─── Services (user resources) ───────────────────────────────────────────────

export const serviceApi = {
  list: (userId: string) => request(`/services?userId=${userId}`),
  get: (id: string) => request(`/services/${id}`),
  start: (id: string) => request(`/services/${id}/start`, { method: 'POST' }),
  stop: (id: string) => request(`/services/${id}/stop`, { method: 'POST' }),
  restart: (id: string) =>
    request(`/services/${id}/restart`, { method: 'POST' }),
  delete: (id: string) =>
    request(`/services/${id}`, { method: 'DELETE' }),
  getLogs: (id: string) => request(`/services/${id}/logs`),
  getMetrics: (id: string) => request(`/services/${id}/metrics`),
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export const invoiceApi = {
  list: (userId: string) => request(`/invoices?userId=${userId}`),
  get: (id: string) => request(`/invoices/${id}`),
  download: (id: string) => `${BASE_URL}/invoices/${id}/pdf`,
  pay: (id: string, method: string) =>
    request(`/invoices/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify({ method }),
    }),
}

// ─── Tickets ─────────────────────────────────────────────────────────────────

export const ticketApi = {
  list: (userId: string) => request(`/tickets?userId=${userId}`),
  get: (id: string) => request(`/tickets/${id}`),
  create: (subject: string, message: string, priority: string) =>
    request('/tickets', {
      method: 'POST',
      body: JSON.stringify({ subject, message, priority }),
    }),
  reply: (id: string, message: string) =>
    request(`/tickets/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  close: (id: string) =>
    request(`/tickets/${id}/close`, { method: 'POST' }),
}

// ─── Backups ─────────────────────────────────────────────────────────────────

export const backupApi = {
  list: (serviceId: string) => request(`/backups?serviceId=${serviceId}`),
  create: (serviceId: string) =>
    request('/backups', {
      method: 'POST',
      body: JSON.stringify({ serviceId }),
    }),
  restore: (id: string) =>
    request(`/backups/${id}/restore`, { method: 'POST' }),
  delete: (id: string) =>
    request(`/backups/${id}`, { method: 'DELETE' }),
}

// ─── Affiliate ────────────────────────────────────────────────────────────────

export const affiliateApi = {
  get: (userId: string) => request(`/affiliate/${userId}`),
  getStats: (userId: string) => request(`/affiliate/${userId}/stats`),
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: () => request('/admin/stats'),
  users: {
    list: (params?: Record<string, string>) =>
      request(`/admin/users?${new URLSearchParams(params)}`),
    get: (id: string) => request(`/admin/users/${id}`),
    update: (id: string, data: object) =>
      request(`/admin/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    suspend: (id: string) =>
      request(`/admin/users/${id}/suspend`, { method: 'POST' }),
    ban: (id: string) =>
      request(`/admin/users/${id}/ban`, { method: 'POST' }),
    resetPassword: (id: string) =>
      request(`/admin/users/${id}/reset-password`, { method: 'POST' }),
  },
  plans: {
    list: () => request('/admin/plans'),
    create: (data: object) =>
      request('/admin/plans', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: object) =>
      request(`/admin/plans/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request(`/admin/plans/${id}`, { method: 'DELETE' }),
  },
  coupons: {
    list: () => request('/admin/coupons'),
    create: (data: object) =>
      request('/admin/coupons', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: object) =>
      request(`/admin/coupons/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request(`/admin/coupons/${id}`, { method: 'DELETE' }),
  },
  nodes: {
    list: () => request('/admin/nodes'),
    create: (data: object) =>
      request('/admin/nodes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: object) =>
      request(`/admin/nodes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      request(`/admin/nodes/${id}`, { method: 'DELETE' }),
  },
  config: {
    get: () => request('/admin/config'),
    update: (section: string, data: object) =>
      request(`/admin/config/${section}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    testIntegration: (name: string) =>
      request(`/admin/config/integrations/${name}/test`, { method: 'POST' }),
    testSmtp: () =>
      request('/admin/config/smtp/test', { method: 'POST' }),
  },
}
