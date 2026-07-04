// ─── Auth & User ────────────────────────────────────────────────────────────

export type UserRole = 'owner' | 'admin' | 'moderator' | 'financial' | 'support' | 'client'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  plan?: string
  planExpiresAt?: string
  createdAt: string
  status: 'active' | 'suspended' | 'banned'
  twoFactorEnabled: boolean
  affiliateCode?: string
}

// ─── Services ────────────────────────────────────────────────────────────────

export type ServiceType = 'discord' | 'whatsapp' | 'telegram' | 'api' | 'website' | 'vps'
export type ServiceStatus = 'online' | 'offline' | 'restarting' | 'suspended'

export interface Service {
  id: string
  userId: string
  name: string
  type: ServiceType
  status: ServiceStatus
  plan: string
  cpu: number
  ram: number
  ramTotal: number
  disk: number
  diskTotal: number
  uptime: string
  ip?: string
  region: string
  createdAt: string
  expiresAt: string
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled'

export interface Invoice {
  id: string
  userId: string
  description: string
  amount: number
  status: InvoiceStatus
  dueDate: string
  paidAt?: string
  createdAt: string
  plan?: string
}

// ─── Tickets ─────────────────────────────────────────────────────────────────

export type TicketStatus = 'open' | 'replied' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface TicketMessage {
  id: string
  from: 'client' | 'agent'
  authorName: string
  text: string
  createdAt: string
}

export interface Ticket {
  id: string
  userId: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  messages: TicketMessage[]
  createdAt: string
  updatedAt: string
}

// ─── Backups ─────────────────────────────────────────────────────────────────

export interface Backup {
  id: string
  serviceId: string
  name: string
  size: string
  createdAt: string
  type: 'auto' | 'manual'
}

// ─── Logs ─────────────────────────────────────────────────────────────────────

export type LogType = 'login' | 'change' | 'activity' | 'security'

export interface ActivityLog {
  id: string
  userId: string
  type: LogType
  description: string
  ip?: string
  createdAt: string
}

// ─── Affiliate ────────────────────────────────────────────────────────────────

export interface AffiliateStats {
  userId: string
  code: string
  link: string
  referrals: number
  conversions: number
  pendingCommission: number
  totalEarned: number
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationType = 'info' | 'warning' | 'success' | 'error'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface AdminStats {
  dailyRevenue: number
  monthlyRevenue: number
  activeUsers: number
  totalUsers: number
  openTickets: number
  activeServices: number
  growth: number
}

export interface Plan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  active: boolean
  recommended: boolean
  vcores: number
  ram: number
  disk: number
  bandwidth: number
}

export interface Coupon {
  id: string
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  maxUses: number
  usedCount: number
  expiresAt?: string
  active: boolean
}

export interface Node {
  id: string
  name: string
  location: string
  ip: string
  status: 'online' | 'offline' | 'maintenance'
  cpuTotal: number
  cpuUsed: number
  ramTotal: number
  ramUsed: number
  diskTotal: number
  diskUsed: number
  servicesCount: number
}

// ─── System Config ────────────────────────────────────────────────────────────

export interface IntegrationConfig {
  id: string
  name: string
  url?: string
  apiKey?: string
  secret?: string
  token?: string
  status: 'connected' | 'disconnected' | 'error'
}

export interface SmtpConfig {
  host: string
  port: number
  user: string
  ssl: boolean
  tls: boolean
}

export interface GeneralConfig {
  companyName: string
  logo?: string
  favicon?: string
  contactEmail: string
  domain: string
  timezone: string
  language: string
  seoTitle: string
  seoDescription: string
}
