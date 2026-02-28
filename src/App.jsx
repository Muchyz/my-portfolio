import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const I = {
  Hex: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.5"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" /><circle cx="12" cy="12" r="3" fill="#00D4FF" stroke="none" /></svg>,
  ArrowUR: ({ s = 11 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10" /></svg>,
  Arrow: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  Send: ({ s = 13 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Menu: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  X: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Check: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Down: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>,
  DL: ({ s = 12 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  Ext: ({ s = 11 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>,
  Cal: ({ s = 11 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Bot: ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="15" x2="8" y2="17" /><line x1="16" y1="15" x2="16" y2="17" /></svg>,
  Brief: ({ s = 12 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  Pin: ({ s = 11 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Layers: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  Lock: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  Globe: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  Layout: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>,
  Card: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  Search: ({ s = 24 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M9 9l2 2-2 2M13 13h-4" /></svg>,
  Mail: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Github: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  Li: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  WhatsApp: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  Tw: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  Shield: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Code: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 20l4-16M14.5 8.5L18 12l-3.5 3.5M9.5 8.5L6 12l3.5 3.5" /></svg>,
  Zap: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  Activity: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  Merge: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" /></svg>,
  DB: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  Spark: ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3zM19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" /></svg>,
  Quote: ({ s = 32 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" opacity="0.1"><path d="M14.017 21v-7.391c0-5.704 3.748-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.966z" /></svg>,
  Star: ({ s = 12 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Commit: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" /></svg>,
  PR: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" /></svg>,
  Flame: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-7 7 5.5 5.5 0 0 1-5.5-5.5c0-1.1.27-2.12.5-3A4.56 4.56 0 0 0 8.5 14.5z" /></svg>,
  Msg: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  File: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  Target: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Clip: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="2" /><path d="m9 12 2 2 4-4" /></svg>,
  Rocket: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  Refresh: ({ s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "React 18", pct: 95, cat: "Frontend", color: "#61DAFB" },
  { name: "Next.js 14", pct: 92, cat: "Frontend", color: "#ffffff" },
  { name: "TypeScript", pct: 90, cat: "Frontend", color: "#3178C6" },
  { name: "Node.js", pct: 93, cat: "Backend", color: "#339933" },
  { name: "Express.js", pct: 91, cat: "Backend", color: "#aaaaaa" },
  { name: "JWT + Auth", pct: 94, cat: "Security", color: "#D63AFF" },
  { name: "MongoDB", pct: 90, cat: "Database", color: "#47A248" },
  { name: "PostgreSQL", pct: 87, cat: "Database", color: "#4169E1" },
  { name: "Redis", pct: 80, cat: "Infra", color: "#DC382D" },
  { name: "Docker", pct: 82, cat: "DevOps", color: "#2496ED" },
  { name: "AWS", pct: 78, cat: "DevOps", color: "#FF9900" },
  { name: "Prisma ORM", pct: 85, cat: "Database", color: "#5A67D8" },
];

const SERVICES = [
  { Icon: I.Layers, title: "Full-Stack Applications", desc: "React + Node.js from architecture to deployment. Complete ownership of the request lifecycle.", price: "from $3,000" },
  { Icon: I.Lock, title: "Authentication Systems", desc: "JWT, OAuth2, TOTP 2FA, RBAC — security that won't make headlines for the wrong reasons.", price: "from $800" },
  { Icon: I.Globe, title: "REST API Development", desc: "Designed, documented, versioned, deployed. OpenAPI spec, rate limiting, webhook support.", price: "from $1,200" },
  { Icon: I.Layout, title: "Admin Dashboards", desc: "Role-scoped analytics with real-time data, export capabilities, and responsive precision.", price: "from $1,500" },
  { Icon: I.Card, title: "Payment Integrations", desc: "Stripe subscriptions, webhooks, refund flows. Idempotent by design, PCI-aware always.", price: "from $600" },
  { Icon: I.Search, title: "Code Audits", desc: "Security vulnerabilities, performance bottlenecks, architecture review. Prioritized plan.", price: "from $500" },
];

const PRINCIPLES = [
  { Icon: I.Shield, t: "Security First", d: "Every endpoint locked before it opens. Zero-trust by default." },
  { Icon: I.Code, t: "API-First Design", d: "Contract before implementation. OpenAPI ships with the code." },
  { Icon: I.Zap, t: "Performance Always", d: "Indexed queries, Redis caching, N+1 prevention. Fast is a feature." },
  { Icon: I.Activity, t: "Observable Systems", d: "Structured logs, health endpoints, meaningful metrics always." },
  { Icon: I.Merge, t: "Ship Then Iterate", d: "CI/CD means main goes live in minutes. Feature flags decouple release." },
  { Icon: I.DB, t: "Data Integrity", d: "Transactions, constraints, validation at every layer. DB as last defense." },
];

const CHANNELS = [
  { Icon: I.Mail, label: "Email", value: "kelvinmuchiri699@gmail.com", hint: "Fastest response", href: "mailto:kelvinmuchiri699@gmail.com" },
  { Icon: I.Github, label: "GitHub", value: "github.com/Muchyz", hint: "See the code", href: "https://github.com/Muchyz" },
  { Icon: I.Li, label: "LinkedIn", value: "Kelvin Muchiri", hint: "Professional", href: "https://www.linkedin.com/in/kelvin-muchiri-830aa2391" },
  { Icon: I.Instagram, label: "Instagram", value: "@kelvin__muchiri", hint: "Behind the scenes", href: "https://www.instagram.com/kelvin__muchiri" },
  { Icon: I.WhatsApp, label: "WhatsApp", value: "+254 705 427 449", hint: "Quick chat", href: "https://wa.me/254705427449" },
];

const EXPERIENCE = [
  { period: "2024 — Present", role: "Senior Full-Stack Engineer", company: "Stealth AI Startup", location: "Remote", color: "#00D4FF", desc: "Architecting a multi-tenant SaaS platform from zero. Leading a team of 4, owning the full stack from DB schema to CI/CD pipelines.", tags: ["React 18", "Node.js", "PostgreSQL", "Docker", "AWS"], highlight: "Reduced P95 latency by 68% through query optimization and Redis caching strategy." },
  { period: "2022 — 2024", role: "Full-Stack Developer", company: "TechForge Agency", location: "New York, USA", color: "#00FFB2", desc: "Delivered 12+ client projects across fintech, e-commerce, and SaaS. Introduced auth standards and API design systems still in use today.", tags: ["Next.js", "Express", "MongoDB", "Stripe", "JWT"], highlight: "Built payment infrastructure processing $2M+ monthly for 3 enterprise clients." },
  { period: "2021 — 2022", role: "Backend Developer", company: "DataStream Inc.", location: "Remote", color: "#7B6EFF", desc: "Owned the REST API layer for a real-time analytics product. Implemented WebSocket infrastructure supporting 50k concurrent connections.", tags: ["Node.js", "Redis", "Socket.io", "PostgreSQL"], highlight: "Scaled WebSocket server from 1k to 50k concurrent connections with zero downtime." },
  { period: "2020 — 2021", role: "Junior Developer", company: "OpenSource Collective", location: "Remote", color: "#FF6B6B", desc: "Contributed to 8 open-source projects. Built and maintained developer tools used by 5k+ developers globally.", tags: ["JavaScript", "React", "Node.js", "GitHub Actions"], highlight: "Top contributor to 3 repos with 500+ stars each." },
];

const STACK_ITEMS = ["React 18", "Next.js 14", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Prisma", "Stripe", "JWT", "OAuth2", "Socket.io", "Zod", "GitHub Actions", "REST APIs", "WebSockets", "CI/CD"];

const TESTIMONIALS = [
  { quote: "Kelvin took our auth system from a liability to a genuine competitive advantage. Every security review since has come back clean. We went from dreading audits to welcoming them.", name: "Sarah Chen", title: "CTO", company: "FinVault", industry: "Fintech", avatar: "SC", color: "#00D4FF", result: "Zero security incidents in 18 months", stars: 5 },
  { quote: "We'd burned through two agencies before Kelvin. In six weeks he delivered a payment platform that's processed over $2M without a single failed transaction. The documentation alone was worth the fee.", name: "Marcus Webb", title: "Founder & CEO", company: "OrderFlow", industry: "E-Commerce", avatar: "MW", color: "#00FFB2", result: "$2M+ processed, 0 failed transactions", stars: 5 },
  { quote: "What impressed me most wasn't the speed — it was that Kelvin asked questions no other freelancer thought to ask. He built exactly what we needed, not just what we described.", name: "Priya Nair", title: "VP Engineering", company: "Databridge", industry: "SaaS", avatar: "PN", color: "#7B6EFF", result: "Delivered 2 weeks ahead of schedule", stars: 5 },
  { quote: "Our API was a mess of undocumented endpoints and time bombs. Kelvin audited, refactored, and documented everything. Our new engineers can onboard in a day instead of a month.", name: "Tom Okafor", title: "Engineering Manager", company: "Nexus Labs", industry: "DevTools", avatar: "TO", color: "#FF6B6B", result: "Onboarding time: 30 days → 1 day", stars: 5 },
];

const GITHUB_LANGS = [
  { lang: "TypeScript", pct: 38, color: "#3178C6" },
  { lang: "JavaScript", pct: 28, color: "#F7DF1E" },
  { lang: "Python", pct: 14, color: "#3776AB" },
  { lang: "Go", pct: 11, color: "#00ADD8" },
  { lang: "Shell", pct: 9, color: "#89E051" },
];

function genGrid() {
  const g = []; const seed = [0, 0, 0, 1, 1, 2, 2, 3, 4];
  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const we = d === 0 || d === 6;
      const base = we ? [0, 0, 0, 1] : seed;
      const v = base[Math.floor(Math.abs(Math.sin(w * 7 + d) * 100) % base.length)];
      const crunch = (w > 8 && w < 12) || (w > 28 && w < 34) || w > 44;
      week.push(crunch && !we ? Math.min(4, v + 2) : v);
    }
    g.push(week);
  }
  return g;
}
const GRID = genGrid();

const HOW_I_WORK = [
  { step: "01", Icon: I.Msg, title: "Discovery Call", duration: "30 min · Free", desc: "We talk through your problem, your stack, and your timeline. I ask the questions most developers skip. You leave with clarity, not a sales pitch.", color: "#00D4FF", deliverable: "Project brief + honest feasibility assessment" },
  { step: "02", Icon: I.File, title: "Proposal & Spec", duration: "24–48 hrs", desc: "You get a written scope with milestones, deliverables, and a fixed price. No hourly surprises. If scope changes, we agree in writing first.", color: "#7B6EFF", deliverable: "Fixed-price proposal with milestone breakdown" },
  { step: "03", Icon: I.Target, title: "Build Sprint", duration: "Agreed timeline", desc: "I code, you get daily async updates via Slack or Linear. You see real progress, not status meetings. Staging environment from day one.", color: "#00FFB2", deliverable: "Deployed staging environment + daily updates" },
  { step: "04", Icon: I.Clip, title: "Review & Refine", duration: "3–5 days", desc: "You test on staging. I fix everything you find. Two rounds of revisions are included. Quality gates before anything hits production.", color: "#FFB800", deliverable: "QA-tested build ready for production" },
  { step: "05", Icon: I.Rocket, title: "Launch", duration: "Deployment day", desc: "I handle the production deploy, monitor for 48 hours, and hand over full documentation: API docs, env vars, runbook, architecture diagram.", color: "#FF6B6B", deliverable: "Live system + full documentation handover" },
  { step: "06", Icon: I.Refresh, title: "Post-Launch Support", duration: "30 days included", desc: "30 days of bug fixes included, no questions asked. After that, optional retainer for ongoing work. I build for the long term, not the invoice.", color: "#D63AFF", deliverable: "30-day warranty + optional retainer" },
];

const PROJECTS = [
  { id: "001", code: "PRJ-001", title: "AuthNexus", category: "Auth Platform", year: "2024", status: "LIVE", tech: ["React 18", "Node.js", "MongoDB", "JWT", "Redis", "OAuth2"], metrics: [{ v: "99.9%", l: "Uptime" }, { v: "<50ms", l: "Auth" }, { v: "10k+", l: "Users" }], color: "#00D4FF", problem: "A fintech client had a homegrown auth system failing under load and failing security audits. Sessions leaked, tokens never expired, and RBAC was hardcoded in 40 different files.", solution: "Designed a stateless JWT architecture with Redis-backed refresh rotation. Extracted RBAC into a middleware graph. Implemented TOTP 2FA with recovery codes. Wrote OpenAPI documentation for the entire auth surface.", outcome: "Passed a third-party security audit with zero critical findings. Auth latency dropped from 340ms to under 50ms. The system now handles 100k concurrent sessions — 10x the previous ceiling.", duration: "6 weeks", teamSize: "Solo" },
  { id: "002", code: "PRJ-002", title: "ShopForge", category: "Commerce Engine", year: "2024", status: "LIVE", tech: ["Next.js 14", "PostgreSQL", "Prisma", "Stripe", "AWS S3", "Redis"], metrics: [{ v: "$50k+", l: "Revenue" }, { v: "500+", l: "Products" }, { v: "3", l: "Roles" }], color: "#00FFB2", problem: "A marketplace startup needed to launch in 8 weeks with multi-vendor support, real-time inventory, and Stripe Connect payouts — three features most platforms get wrong independently.", solution: "Built on Next.js 14 App Router with PostgreSQL and Prisma for type-safe queries. Stripe Connect for split payouts. WebSocket-driven inventory that reflects stock changes in under 200ms across all clients. Role-scoped admin portal for vendors, admins, and buyers.", outcome: "Launched on schedule. Processed $50k+ in revenue in the first 90 days. Zero inventory oversell incidents. Vendor onboarding takes 4 minutes without engineering involvement.", duration: "8 weeks", teamSize: "Solo" },
  { id: "003", code: "PRJ-003", title: "DevCollab API", category: "API Infrastructure", year: "2025", status: "LIVE", tech: ["Node.js", "Express", "MongoDB", "Redis", "Docker", "Swagger"], metrics: [{ v: "50+", l: "Endpoints" }, { v: "1M+", l: "Req/mo" }, { v: "<20ms", l: "Latency" }], color: "#7B6EFF", problem: "A developer tools company had an internal API growing organically for 3 years. No versioning, no rate limits, no documentation. Onboarding a new integration partner took a week of back-and-forth.", solution: "Audited and refactored 50+ endpoints with consistent response shapes. Implemented Zod validation at every boundary. Added API key management with per-key rate limiting and usage analytics. Auto-generated Swagger docs from route definitions.", outcome: "Partner integrations dropped from 1 week to 1 day. API handles 1M+ requests/month at under 20ms P95 latency. Zero breaking changes shipped to existing consumers since launch.", duration: "10 weeks", teamSize: "Solo + 1 reviewer" },
  { id: "004", code: "PRJ-004", title: "TaskFlow SaaS", category: "Collaboration", year: "2025", status: "BETA", tech: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Stripe", "Redis"], metrics: [{ v: "200+", l: "Teams" }, { v: "99.8%", l: "Uptime" }, { v: "RT", l: "Collab" }], color: "#FF6B6B", problem: "A project management startup wanted to compete with Linear and Jira but for smaller teams — real-time, opinionated, and affordable. Needed multi-tenant isolation from day one to attract enterprise pilots.", solution: "Row-level security in PostgreSQL for true tenant isolation. Socket.io rooms scoped to workspace IDs for real-time sync. Stripe Billing with usage-based metering. Kanban, Gantt, and sprint views built as composable React components sharing one data layer.", outcome: "200+ teams in beta. 99.8% uptime. Real-time sync under 80ms globally. Two enterprise pilots signed based on the isolation architecture alone.", duration: "14 weeks (ongoing)", teamSize: "Lead + 2 contractors" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useTypewriter(words) {
  const [display, setDisplay] = useState(""); const [wi, setWi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const t = setTimeout(() => {
      if (!del) { setDisplay(word.slice(0, ci + 1)); if (ci + 1 === word.length) setTimeout(() => setDel(true), 2200); else setCi(c => c + 1); }
      else { setDisplay(word.slice(0, ci - 1)); if (ci - 1 === 0) { setDel(false); setWi(w => (w + 1) % words.length); } else setCi(c => c - 1); }
    }, del ? 26 : 88);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return display;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const max = document.body.scrollHeight - window.innerHeight; setP(max > 0 ? window.scrollY / max : 0); };
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth <= 820);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)"); setM(mq.matches);
    const fn = e => setM(e.matches); mq.addEventListener("change", fn); return () => mq.removeEventListener("change", fn);
  }, []);
  return m;
}

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null); const ring = useRef(null); const pos = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) return;
    const onMove = e => { pos.current.tx = e.clientX; pos.current.ty = e.clientY; };
    const onDown = () => ring.current?.classList.add("clicking");
    const onUp = () => ring.current?.classList.remove("clicking");
    const onOver = e => {
      const el = e.target.closest("button,a,.glass-panel"); const isBtn = e.target.closest(".btn-primary,.btn-ghost");
      ring.current?.classList.toggle("active", !!el); ring.current?.classList.toggle("on-btn", !!isBtn);
    };
    window.addEventListener("mousemove", onMove); document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown); window.addEventListener("mouseup", onUp);
    let raf;
    const loop = () => {
      pos.current.cx += (pos.current.tx - pos.current.cx) * 0.11; pos.current.cy += (pos.current.ty - pos.current.cy) * 0.11;
      if (dot.current) { dot.current.style.left = pos.current.tx + "px"; dot.current.style.top = pos.current.ty + "px"; }
      if (ring.current) { ring.current.style.left = pos.current.cx + "px"; ring.current.style.top = pos.current.cy + "px"; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); document.removeEventListener("mouseover", onOver); window.removeEventListener("mousedown", onDown); window.removeEventListener("mouseup", onUp); };
  }, [isMobile]);
  if (isMobile) return null;
  return (<><div ref={dot} className="cur-dot" /><div ref={ring} className="cur-ring"><div className="cur-ring-inner" /></div></>);
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS EFFECTS
// ─────────────────────────────────────────────────────────────────────────────
function NoiseCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d"); let raf;
    c.width = 200; c.height = 200;
    const draw = () => { const img = ctx.createImageData(200, 200); for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255 | 0; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 13; } ctx.putImageData(img, 0, 0); raf = requestAnimationFrame(draw); };
    draw(); return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="noise-canvas" aria-hidden />;
}

function GridCanvas({ mousePos }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return; const ctx = canvas.getContext("2d"); let W, H, raf, t = 0;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      const step = 80; const mx = (mousePos?.current?.x ?? 0.5) * W; const my = (mousePos?.current?.y ?? 0.5) * H;
      for (let y = 0; y < H + step; y += step) {
        const fy = y / H, dist = Math.abs(my - y) / H, alpha = 0.015 + fy * 0.03 + (1 - dist) * 0.007, waveAmt = Math.max(0, 0.05 - dist * 0.07);
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`; ctx.lineWidth = 0.5; ctx.beginPath();
        for (let x = 0; x <= W; x += 5) { const wave = Math.sin(x / W * 7 + t + fy * 3) * waveAmt * 12; x === 0 ? ctx.moveTo(x, y + wave) : ctx.lineTo(x, y + wave); } ctx.stroke();
      }
      for (let x = 0; x < W + step; x += step) { const dist = Math.abs(mx - x) / W; ctx.strokeStyle = `rgba(0,212,255,${0.01 + (1 - dist) * 0.005})`; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="grid-canvas" />;
}

function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return; const ctx = canvas.getContext("2d"); let W, H, raf;
    const particles = Array.from({ length: 60 }, () => ({ x: Math.random() * 1200, y: Math.random() * 800, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.05 }));
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,212,255,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="particle-canvas" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// GLASS PANEL
// ─────────────────────────────────────────────────────────────────────────────
function Glass({ children, className = "", style = {}, tilt = false, onClick, glow = false }) {
  const ref = useRef(null); const isMobile = useIsMobile();
  const onMove = useCallback(e => {
    if (!tilt || isMobile || !ref.current) return;
    const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transition = "transform 0.1s"; ref.current.style.transform = `perspective(1400px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    const sh = ref.current.querySelector(".glass-shine"); if (sh) { sh.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(0,212,255,0.10), transparent 60%)`; sh.style.opacity = "1"; }
  }, [tilt, isMobile]);
  const onLeave = useCallback(() => {
    if (!tilt || !ref.current) return;
    ref.current.style.transition = "transform 0.9s cubic-bezier(0.23,1,0.32,1)"; ref.current.style.transform = "none";
    const sh = ref.current.querySelector(".glass-shine"); if (sh) sh.style.opacity = "0";
  }, [tilt]);
  return (
    <div ref={ref} className={`glass-panel ${glow ? "glass-glow" : ""} ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {tilt && <div className="glass-shine" />}
      <div className="glass-edge-t" /><div className="glass-edge-l" />
      {children}
    </div>
  );
}

function Chip({ label, color = "#00D4FF", pulse = false }) {
  return <span className="chip" style={{ "--chip-color": color }}>{pulse && <span className="chip-pulse" />}{label}</span>;
}

function ScanText({ children, delay = 0, tag: Tag = "div", className = "" }) {
  const [ref, vis] = useInView(0.07);
  return <Tag ref={ref} className={`scan-reveal ${className} ${vis ? "is-visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>{children}</Tag>;
}

function Counter({ value }) {
  const [ref, vis] = useInView(0.3); const [n, setN] = useState(0); const done = useRef(false);
  useEffect(() => {
    if (!vis || done.current) return; done.current = true;
    const num = parseFloat(value.replace(/[^0-9.]/g, "")), dur = 1800, t0 = performance.now();
    const tick = now => { const p = Math.min((now - t0) / dur, 1); setN(Math.round((1 - Math.pow(1 - p, 4)) * num)); if (p < 1) requestAnimationFrame(tick); else setN(num); };
    requestAnimationFrame(tick);
  }, [vis, value]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// AI CHAT WIDGET
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Kelvin Muchiri's portfolio AI assistant. Be sharp, concise, and professional.

About Kelvin: Senior Full-Stack Engineer with 4+ years experience. Specializes in React, Node.js, JWT auth, REST APIs, PostgreSQL, MongoDB, Redis. Available for freelance starting March 2025. Built systems handling 100k+ users, $50k+ revenue. Projects: AuthNexus (enterprise auth), ShopForge (e-commerce), DevCollab API, TaskFlow SaaS.

Contact: Email kelvinmuchiri699@gmail.com, GitHub github.com/Muchyz, LinkedIn kelvin-muchiri-830aa2391, Instagram @kelvin__muchiri, WhatsApp +254705427449.

Services pricing: Full-Stack from $3k, Auth from $800, APIs from $1.2k, Dashboards from $1.5k, Payments from $600, Audits from $500.

Be confident, not salesy. Keep responses under 3 sentences when possible. Encourage interested people to use the contact form. Don't make up details or discuss other engineers.`;

function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hey! I'm Kelvin's AI assistant. Ask me anything about his skills, projects, or how he can help you ship." }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false); const [hasNotif, setHasNotif] = useState(true);
  const bottomRef = useRef(null); const inputRef = useRef(null);
  useEffect(() => { if (open) { setHasNotif(false); setTimeout(() => inputRef.current?.focus(), 300); } }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages(m => [...m, userMsg]); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }) });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.content?.[0]?.text || "Try again in a moment!" }]);
    } catch { setMessages(m => [...m, { role: "assistant", content: "Connection issue — please try again." }]); }
    setLoading(false);
  };

  const SUGG = ["What can Kelvin build?", "What are your rates?", "Tell me about AuthNexus", "Is Kelvin available?"];
  return (
    <>
      <div className={`chat-widget ${open ? "chat-open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar"><I.Bot s={16} /><span className="chat-online-dot" /></div>
            <div><div className="chat-name">Kelvin's AI</div><div className="chat-status">Ask me anything</div></div>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)}><I.X s={16} /></button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === "assistant" && <div className="chat-msg-avatar"><I.Bot s={12} /></div>}
              <div className="chat-bubble">{m.content}</div>
            </div>
          ))}
          {loading && <div className="chat-msg assistant"><div className="chat-msg-avatar"><I.Bot s={12} /></div><div className="chat-bubble chat-typing"><span /><span /><span /></div></div>}
          <div ref={bottomRef} />
        </div>
        {messages.length === 1 && <div className="chat-suggestions">{SUGG.map(s => <button key={s} className="chat-suggestion" onClick={() => { setInput(s); setTimeout(send, 0); }}>{s}</button>)}</div>}
        <div className="chat-input-row">
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about Kelvin's work..." className="chat-input" />
          <button className="chat-send" onClick={send} disabled={!input.trim() || loading}><I.Send s={13} /></button>
        </div>
      </div>
      <button className={`chat-fab ${open ? "chat-fab-hidden" : ""}`} onClick={() => setOpen(true)} aria-label="Open chat">
        {hasNotif && <span className="chat-fab-notif" />}
        <span className="chat-fab-icon"><I.Bot s={22} /></span>
        <span className="chat-fab-label">Ask AI</span>
      </button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [pct, setPct] = useState(0); const [phase, setPhase] = useState("BOOT SEQUENCE"); const [lines, setLines] = useState([]); const [done, setDone] = useState(false);
  const canvasRef = useRef(null);
  const LOG = ["▶  Mounting runtime environment...", "▶  Initializing secure context...", "▶  Loading authentication modules...", "▶  Compiling interface assets...", "✓  All systems nominal"];
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight; let t = 0, raf;
    const W = canvas.width, H = canvas.height;
    const draw = () => {
      t += 0.012; ctx.clearRect(0, 0, W, H);
      const size = Math.min(40, W / 14), rows = Math.ceil(H / (size * 1.73)) + 1, cols = Math.ceil(W / (size * 2)) + 1;
      for (let row = -1; row < rows; row++) for (let col = -1; col < cols; col++) {
        const x = col * size * 2 + (row % 2) * size, y = row * size * 1.73;
        const dist = Math.sqrt((x - W / 2) ** 2 + (y - H / 2) ** 2), wave = Math.sin(dist * 0.015 - t * 2) * 0.5 + 0.5, alpha = wave * 0.05 * (1 - dist / Math.sqrt((W / 2) ** 2 + (H / 2) ** 2));
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`; ctx.lineWidth = 0.5; ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3, px = x + size * 0.88 * Math.cos(a), py = y + size * 0.88 * Math.sin(a); i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
        ctx.closePath(); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const phases = ["BOOT SEQUENCE", "LOADING MODULES", "COMPILING ASSETS", "MOUNTING INTERFACE", "SYSTEM READY"], vals = [0, 22, 48, 77, 100];
    let i = 0, li = 0;
    const addLine = () => { if (li < LOG.length) { setLines(l => [...l, LOG[li++]]); setTimeout(addLine, 280 + Math.random() * 180); } };
    addLine();
    const next = () => { if (i < vals.length) { setPct(vals[i]); setPhase(phases[i]); i++; setTimeout(next, i === vals.length ? 600 : 300 + Math.random() * 200); } else { setTimeout(() => { setDone(true); cancelAnimationFrame(raf); setTimeout(onDone, 700); }, 100); } };
    setTimeout(next, 400);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loader ${done ? "loader-exit" : ""}`}>
      <canvas ref={canvasRef} className="loader-hex-canvas" />
      <div className="loader-content">
        <div className="loader-logo">
          <div className="loader-hex-icon">
            <svg viewBox="0 0 80 80" fill="none" width="68" height="68">
              <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
              <polygon points="40,16 62,28 62,52 40,64 18,52 18,28" stroke="#00D4FF" strokeWidth="0.5" fill="none" opacity="0.3" />
              <circle cx="40" cy="40" r="7" fill="#00D4FF" />
              <circle cx="40" cy="40" r="14" stroke="#00D4FF" strokeWidth="0.5" fill="none" opacity="0.25" />
            </svg>
          </div>
          <div className="loader-brand">
            <span className="loader-name">KELVIN<span>.</span>SYS</span>
            <span className="loader-version">v2.0.25 · PORTFOLIO OS</span>
          </div>
        </div>
        <div className="loader-terminal">
          {lines.map((l, i) => <div key={i} className="loader-log-line">{l}</div>)}
          <div className="loader-cursor-line"><span className="loader-prompt">$ </span><span className="loader-blink-caret" /></div>
        </div>
        <div className="loader-bottom">
          <div className="loader-phase-wrap"><span className="loader-phase-dot" /><span>{phase}</span></div>
          <div className="loader-bar-wrap"><div className="loader-bar-fill" style={{ width: `${pct}%` }} /><div className="loader-bar-glow" style={{ left: `${Math.max(0, pct - 1)}%` }} /></div>
          <div className="loader-meta">
            <div className="loader-segments">{Array.from({ length: 20 }, (_, i) => <div key={i} className={`loader-seg ${i < Math.floor(pct / 5) ? "on" : ""}`} />)}</div>
            <div className="loader-pct">{String(pct).padStart(3, "0")}<span>%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAWER
// ─────────────────────────────────────────────────────────────────────────────
function Drawer({ open, onClose }) {
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); onClose(); };
  const links = [["home", "Home"], ["about", "About"], ["projects", "Projects"], ["experience", "Experience"], ["skills", "Skills"], ["process", "Process"], ["testimonials", "Reviews"], ["services", "Services"], ["contact", "Contact"]];
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-brand"><I.Hex s={20} /><span>KELVIN<em>.</em></span></div>
          <button className="drawer-close" onClick={onClose}><I.X s={20} /></button>
        </div>
        <nav className="drawer-nav">
          {links.map(([id, label], i) => (
            <button key={id} className="drawer-link" onClick={() => go(id)} style={{ transitionDelay: `${open ? i * 0.05 : 0}s` }}>
              <span className="drawer-link-num">0{i + 1}</span><span>{label}</span><I.Arrow s={14} />
            </button>
          ))}
        </nav>
        <div className="drawer-footer">
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 9, color: "var(--text-dim)" }}><span className="nav-status-dot" /><span>Available for work</span></div>
          <button className="btn-primary" onClick={() => go("contact")}>Hire Me&nbsp;<I.ArrowUR s={11} /></button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ scrolled, progress }) {
  const [active, setActive] = useState("home"); const [drawerOpen, setDrawerOpen] = useState(false);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const links = [["home", "Home"], ["about", "About"], ["projects", "Projects"], ["experience", "XP"], ["skills", "Skills"], ["process", "Process"], ["testimonials", "Reviews"], ["contact", "Contact"]];
  useEffect(() => {
    const ids = links.map(([id]) => document.getElementById(id)).filter(Boolean);
    const o = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -40% 0px" });
    ids.forEach(s => o.observe(s)); return () => o.disconnect();
  }, []);
  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
        <button className="nav-logo" onClick={() => go("home")}><I.Hex s={20} /><span className="nav-logo-text">KELVIN<em>.</em></span></button>
        <nav className="nav-links">
          {links.map(([id, label]) => (
            <button key={id} className={`nav-link ${active === id ? "nav-link-active" : ""}`} onClick={() => go(id)}>{label}<span className="nav-link-dot" /></button>
          ))}
        </nav>
        <div className="nav-right">
          <div className="nav-status-desktop"><span className="nav-status-dot" /><span>Available</span></div>
          <button className="btn-primary nav-hire-btn" onClick={() => go("contact")}>Hire Me&nbsp;<I.ArrowUR s={11} /></button>
          <button className="nav-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu"><I.Menu s={22} /></button>
        </div>
      </header>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ mousePos }) {
  const typed = useTypewriter(["Full-Stack Engineer", "Backend Architect", "API Designer", "React Specialist", "Systems Builder"]);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="hero">
      <GridCanvas mousePos={mousePos} /><NoiseCanvas />
      <div className="orbs" aria-hidden><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /></div>
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge-row"><Chip label="OPEN TO WORK · 2025" pulse /></div>
          <h1 className="hero-title">
            <span className="hero-t-line"><span className="hero-t1">FULL</span></span>
            <span className="hero-t-line"><span className="hero-t2">STACK</span></span>
            <span className="hero-t-line"><span className="hero-t3"><em>ENGINEER</em></span></span>
          </h1>
          <div className="hero-terminal"><span className="hero-prompt">❯&nbsp;</span><span>{typed}</span><span className="hero-caret" /></div>
          <p className="hero-desc">Building <strong>secure</strong>, <strong>scalable</strong> production systems with React, Node.js, and REST APIs that handle real load — engineered to last.</p>
          <div className="hero-actions">
            <button className="btn-primary btn-lg" onClick={() => go("projects")}>View Projects&nbsp;<I.Arrow s={14} /></button>
            <button className="btn-ghost btn-lg" onClick={() => go("contact")}>Let's Talk</button>
          </div>
          <div className="hero-stats">
            {[["4+", "YRS EXP"], ["15+", "PROJECTS"], ["10+", "CLIENTS"], ["99.9%", "UPTIME"]].map(([v, l]) => (
              <div key={l} className="hstat"><div className="hstat-val">{v}</div><div className="hstat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card-scene">
            <Glass tilt className="hcard-main" glow>
              <div className="hcard-header">
                <div className="hcard-dots">{["#FF5F57", "#FFBD2E", "#28C840"].map(c => <span key={c} style={{ background: c }} />)}</div>
                <span className="hcard-filename">dev.config.json</span>
                <span className="hcard-tag">● JSON</span>
              </div>
              <div className="hcard-code">
                <div className="cc-line"><span className="cc-brace">{"{"}</span></div>
                <div className="cc-line cc-in"><span className="cc-key">"name"</span><span className="cc-col">: </span><span className="cc-str">"Kelvin Muchiri"</span>,</div>
                <div className="cc-line cc-in"><span className="cc-key">"role"</span><span className="cc-col">: </span><span className="cc-str">"Full-Stack Engineer"</span>,</div>
                <div className="cc-line cc-in"><span className="cc-key">"stack"</span><span className="cc-col">: </span><span className="cc-br">["React", "Node.js"]</span>,</div>
                <div className="cc-line cc-in cc-active"><span className="cc-key">"available"</span><span className="cc-col">: </span><span className="cc-bool">true</span></div>
                <div className="cc-line"><span className="cc-brace">{"}"}</span></div>
              </div>
              <div className="hcard-status-bar"><span className="hcard-pulse" /><span>System Online</span><span className="hcard-version">v2.0.25</span></div>
            </Glass>
            <Glass className="hcard-float hcard-f1" tilt><div className="hf-val" style={{ color: "#00D4FF" }}>99.9%</div><div className="hf-label">Uptime</div></Glass>
            <Glass className="hcard-float hcard-f2" tilt><div className="hf-val" style={{ color: "#00FFB2" }}>&lt;50ms</div><div className="hf-label">Auth Speed</div></Glass>
            <Glass className="hcard-float hcard-f3" tilt><div className="hf-val" style={{ color: "#7B6EFF" }}>10k+</div><div className="hf-label">Users</div></Glass>
            <div className="hero-rings" aria-hidden><div className="hero-ring hero-ring-1" /><div className="hero-ring hero-ring-2" /><div className="hero-ring hero-ring-3" /></div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator"><div className="hsi-line" /><span>SCROLL</span></div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden>
      <div className="marquee-fade-l" /><div className="marquee-fade-r" />
      <div className="marquee-inner">
        {[...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => <span key={i} className="marquee-item"><span className="marquee-bull">◆</span>{item}</span>)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="about" className="section">
      <div className="about-layout">
        {/* ── LEFT: Photo + Text ── */}
        <div className="about-left">
          {/* Photo card */}
          <ScanText delay={0.05}>
            <div className="about-photo-wrap">
              <div className="about-photo-rings">
                <div className="apr apr-1" />
                <div className="apr apr-2" />
              </div>
              <div className="about-photo-frame">
                <img src="/kelvin.png" alt="Kelvin Muchiri" className="about-photo-img" />
                <div className="about-photo-overlay" />
                <div className="about-photo-corner apc-tl" />
                <div className="about-photo-corner apc-tr" />
                <div className="about-photo-corner apc-bl" />
                <div className="about-photo-corner apc-br" />
              </div>
              <div className="about-photo-badge">
                <span className="nav-status-dot" />
                <span>Available for hire</span>
              </div>
              <div className="about-photo-tag">
                <span className="about-photo-tag-line">KM</span>
                <span className="about-photo-tag-sub">Full-Stack Engineer</span>
              </div>
            </div>
          </ScanText>

          {/* Text below photo */}
          <ScanText className="section-eyebrow" delay={0.1}>// 01 — ABOUT</ScanText>
          <ScanText tag="h2" className="section-title" delay={0.08}>I write code<br />that <em>earns</em><br />its keep.</ScanText>
          <ScanText className="about-body" delay={0.14}>Full-stack developer with a bias toward security-first design, clean architecture, and APIs developers actually enjoy using.</ScanText>
          <ScanText className="about-body" delay={0.2}>My work lives at the intersection of <strong>React</strong> frontends, <strong>Node.js</strong> backends, and <strong>JWT authentication</strong> — the full picture, nothing delegated.</ScanText>
          <ScanText delay={0.26}><div className="tag-cluster">{["Clean Code", "Security-First", "API Design", "Performance", "System Design", "DevOps", "Testing", "Scalability"].map(t => <span key={t} className="tag-pill">{t}</span>)}</div></ScanText>
          <ScanText delay={0.32}><div className="about-btns"><button className="btn-primary" onClick={() => go("contact")}>Start a Conversation&nbsp;<I.Arrow s={12} /></button><button className="btn-outline">Download CV&nbsp;<I.DL s={12} /></button></div></ScanText>
        </div>

        {/* ── RIGHT: Principles grid ── */}
        <div className="principles-grid">
          {PRINCIPLES.map((p, i) => (
            <ScanText key={p.t} delay={0.1 + i * 0.07}>
              <Glass tilt className="principle-card">
                <span className="principle-icon"><p.Icon s={20} /></span>
                <div className="principle-title">{p.t}</div>
                <div className="principle-desc">{p.d}</div>
              </Glass>
            </ScanText>
          ))}
        </div>
      </div>
      <ScanText delay={0.4}>
        <div className="about-stats-bar">
          {[{ v: "2847", l: "Commits", sub: "total pushes", icon: "◈", color: "#00D4FF" }, { v: "48", l: "Repos", sub: "public & private", icon: "◉", color: "#00FFB2" }, { v: "312", l: "PRs", sub: "merged to main", icon: "◎", color: "#7B6EFF" }, { v: "15", l: "Projects", sub: "shipped to prod", icon: "◆", color: "#FFB800" }, { v: "10", l: "Clients", sub: "worldwide", icon: "◐", color: "#FF6B6B" }].map(({ v, l, sub, icon, color }) => (
            <div key={l} className="abs-stat" style={{ "--ac": color }}>
              <div className="abs-stat-icon" style={{ color }}>{icon}</div>
              <div className="abs-stat-body">
                <div className="abs-val" style={{ color }}><Counter value={v} /><span className="abs-val-plus">+</span></div>
                <div className="abs-label">{l}</div>
                <div className="abs-sub">{sub}</div>
              </div>
              <div className="abs-bar-fill" style={{ background: color }} />
            </div>
          ))}
        </div>
      </ScanText>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY MODAL
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ p, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-stripe" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}60, transparent)` }} />
        <div className="modal-header">
          <div className="modal-header-left"><span className="modal-code" style={{ color: p.color }}>{p.code}</span><Chip label={p.status} color={p.status === "LIVE" ? "#00FFB2" : "#FFB800"} pulse={p.status === "LIVE"} /></div>
          <button className="modal-close" onClick={onClose}><I.X s={18} /></button>
        </div>
        <div className="modal-hero">
          <h2 className="modal-title" style={{ "--mc": p.color }}>{p.title}</h2>
          <div className="modal-meta-row">
            <span className="modal-meta-item"><I.Cal s={10} />&nbsp;{p.year}</span>
            <span className="modal-meta-item"><I.Brief s={10} />&nbsp;{p.duration}</span>
            <span className="modal-meta-item"><I.Spark s={10} />&nbsp;{p.teamSize}</span>
            <span className="modal-meta-item" style={{ color: p.color }}>{p.category}</span>
          </div>
        </div>
        <div className="modal-metrics">
          {p.metrics.map(m => <div key={m.l} className="modal-metric"><div className="modal-metric-val" style={{ color: p.color }}>{m.v}</div><div className="modal-metric-lbl">{m.l}</div></div>)}
        </div>
        <div className="modal-body">
          <div className="modal-section"><div className="modal-section-label" style={{ color: p.color }}><span className="modal-section-num">01</span> THE PROBLEM</div><p className="modal-text">{p.problem}</p></div>
          <div className="modal-section"><div className="modal-section-label" style={{ color: p.color }}><span className="modal-section-num">02</span> THE SOLUTION</div><p className="modal-text">{p.solution}</p></div>
          <div className="modal-section modal-outcome"><div className="modal-section-label" style={{ color: p.color }}><span className="modal-section-num">03</span> THE OUTCOME</div><p className="modal-text">{p.outcome}</p></div>
        </div>
        <div className="modal-tech">{p.tech.map(t => <span key={t} className="tag-mono">{t}</span>)}</div>
        <div className="modal-footer">
          <a className="btn-primary" href="https://github.com/Muchyz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>View on GitHub&nbsp;<I.Github s={11} /></a>
          <a className="btn-outline" href="https://github.com/Muchyz" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}><I.Github s={11} />&nbsp;GitHub</a>
          <button className="btn-ghost" style={{ marginLeft: "auto" }} onClick={() => { onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 300); }}>Build Something Similar&nbsp;<I.Arrow s={12} /></button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
function Projects() {
  const [activeCase, setActiveCase] = useState(null);
  return (
    <section id="projects" className="section">
      <ScanText className="section-eyebrow">// 02 — FEATURED WORK</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>Projects I'm <em>proud of.</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>Real systems. Real architecture. Click any card to read the full case study.</ScanText>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <ScanText key={p.id} delay={0.08 + i * 0.08}>
            <Glass tilt className="project-card" onClick={() => setActiveCase(p)}>
              <div className="pc-id-stripe" style={{ background: p.color }} />
              <div className="pc-top">
                <div className="pc-meta"><span className="pc-code" style={{ color: p.color }}>{p.code}</span><Chip label={p.status} color={p.status === "LIVE" ? "#00FFB2" : "#FFB800"} pulse={p.status === "LIVE"} /></div>
                <div className="pc-right-meta"><span className="pc-year">{p.year}</span><span className="pc-view-hint" style={{ color: p.color }}>View Case Study</span></div>
              </div>
              <h3 className="pc-title" style={{ "--pc": p.color }}>{p.title}</h3>
              <div className="pc-cat">{p.category}</div>
              <div className="pc-metrics">{p.metrics.map(m => <div key={m.l} className="pc-metric"><div className="pcm-val" style={{ color: p.color }}>{m.v}</div><div className="pcm-lbl">{m.l}</div></div>)}</div>
              <div className="pc-problem-teaser"><span className="pc-problem-label" style={{ color: p.color }}>Problem ›</span><span className="pc-problem-text">{p.problem.split(".")[0]}.</span></div>
              <span className="pc-corner pc-tr" style={{ borderColor: p.color }} /><span className="pc-corner pc-bl" style={{ borderColor: p.color }} />
              <div className="pc-accent-line" style={{ background: `linear-gradient(90deg,${p.color},${p.color}00)` }} />
              <div className="pc-open-arrow" style={{ color: p.color }}><I.ArrowUR s={16} /></div>
            </Glass>
          </ScanText>
        ))}
      </div>
      {activeCase && <Modal p={activeCase} onClose={() => setActiveCase(null)} />}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────
function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" className="section">
      <ScanText className="section-eyebrow">// 03 — EXPERIENCE</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>Where I've <em>shipped.</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>4 years. Multiple industries. One consistent standard.</ScanText>
      <div className="exp-timeline">
        <div className="exp-timeline-line" />
        {EXPERIENCE.map((exp, i) => (
          <ScanText key={i} delay={0.08 + i * 0.1}>
            <div className={`exp-card ${open === i ? "exp-open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="exp-timeline-dot" style={{ borderColor: exp.color, boxShadow: open === i ? `0 0 16px ${exp.color}60` : "none" }}>
                <div className="exp-dot-inner" style={{ background: open === i ? exp.color : "transparent" }} />
              </div>
              <Glass className="exp-content" tilt>
                <div className="exp-header">
                  <div className="exp-left">
                    <div className="exp-period" style={{ color: exp.color }}><I.Cal s={9} />&nbsp;{exp.period}</div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company"><I.Brief s={12} />&nbsp;{exp.company}<span className="exp-sep">·</span><I.Pin s={11} />&nbsp;{exp.location}</div>
                  </div>
                  <button className="exp-toggle" style={{ color: exp.color }}><I.Down s={16} /></button>
                </div>
                <div className={`exp-body ${open === i ? "exp-body-open" : ""}`}>
                  <p className="exp-desc">{exp.desc}</p>
                  <div className="exp-highlight" style={{ borderColor: `${exp.color}40` }}>
                    <span className="exp-highlight-icon" style={{ color: exp.color }}><I.Spark s={12} /></span>
                    <span>{exp.highlight}</span>
                  </div>
                  <div className="exp-tags">{exp.tags.map(t => <span key={t} className="tag-mono" style={{ borderColor: `${exp.color}25`, color: `${exp.color}80` }}>{t}</span>)}</div>
                </div>
              </Glass>
            </div>
          </ScanText>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────
function SkillBar({ s, i }) {
  const [ref, vis] = useInView(0.08);
  return (
    <div ref={ref} className={`skill-bar ${vis ? "sb-revealed" : ""}`} style={{ transitionDelay: `${i * 0.04}s` }}>
      <div className="sb-left">
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="2" />
          <circle cx="22" cy="22" r="18" fill="none" stroke={s.color} strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={vis ? `${2 * Math.PI * 18 * (1 - s.pct / 100)}` : `${2 * Math.PI * 18}`}
            strokeLinecap="round"
            style={{ transition: `stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.04 + 0.25}s`, transform: "rotate(-90deg)", transformOrigin: "22px 22px" }} />
        </svg>
        <div className="sb-info"><span className="sb-name">{s.name}</span><span className="sb-cat">{s.cat}</span></div>
      </div>
      <div className="sb-right">
        <div className="sb-track">
          <div className="sb-fill" style={{ width: vis ? `${s.pct}%` : "0%", background: `linear-gradient(90deg,${s.color}25,${s.color})`, transitionDelay: `${i * 0.04 + 0.25}s` }} />
          <div className="sb-glow" style={{ left: vis ? `${s.pct}%` : "0%", background: s.color, boxShadow: `0 0 8px ${s.color}`, transitionDelay: `${i * 0.04 + 0.25}s` }} />
        </div>
        <div className="sb-pct-num" style={{ color: s.color }}>{s.pct}<span>%</span></div>
      </div>
    </div>
  );
}

function Skills() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Frontend", "Backend", "Database", "Security", "Infra", "DevOps"];
  const shown = filter === "All" ? SKILLS : SKILLS.filter(s => s.cat === filter);
  return (
    <section id="skills" className="section">
      <ScanText className="section-eyebrow">// 04 — TECH STACK</ScanText>
      <div className="skills-header">
        <ScanText tag="h2" className="section-title" delay={0.08}>My <em>Arsenal</em></ScanText>
        <div className="filter-row">{cats.map(c => <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>)}</div>
      </div>
      <div className="skills-list">{shown.map((s, i) => <SkillBar key={s.name} s={s} i={i} />)}</div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GITHUB STATS
// ─────────────────────────────────────────────────────────────────────────────
function GitHubStats() {
  const cellColor = v => ["rgba(0,212,255,0.05)", "rgba(0,212,255,0.18)", "rgba(0,212,255,0.38)", "rgba(0,212,255,0.62)", "rgba(0,212,255,0.9)"][v] || "rgba(0,212,255,0.05)";
  return (
    <section className="section gh-section">
      <ScanText className="section-eyebrow">// 05 — GITHUB ACTIVITY</ScanText>
      <div className="gh-layout">
        <div className="gh-left">
          <ScanText tag="h2" className="section-title" delay={0.06}>Code ships<br /><em>every day.</em></ScanText>
          <ScanText className="gh-body" delay={0.14}>Consistency over intensity. The commit history doesn't lie — 2,847 commits across 48 repos in the last year.</ScanText>
          <ScanText delay={0.2}>
            <div className="gh-stat-grid">
              {[{ Icon: I.Commit, val: "2,847", label: "Commits", color: "#00D4FF" }, { Icon: I.PR, val: "312", label: "Pull Requests", color: "#00FFB2" }, { Icon: I.Flame, val: "186", label: "Day Streak", color: "#FF6B6B" }, { Icon: I.Star, val: "1.2k", label: "Stars Earned", color: "#FFB800" }].map(s => (
                <Glass key={s.label} className="gh-stat-card" tilt>
                  <div className="gh-stat-icon" style={{ color: s.color }}><s.Icon s={16} /></div>
                  <div className="gh-stat-val" style={{ color: s.color }}>{s.val}</div>
                  <div className="gh-stat-label">{s.label}</div>
                </Glass>
              ))}
            </div>
          </ScanText>
          <ScanText delay={0.3}>
            <Glass className="gh-langs-panel">
              <div className="gh-langs-title">Top Languages</div>
              {GITHUB_LANGS.map(l => (
                <div key={l.lang} className="gh-lang-row">
                  <span className="gh-lang-name">{l.lang}</span>
                  <div className="gh-lang-track"><div className="gh-lang-fill" style={{ width: `${l.pct}%`, background: l.color }} /></div>
                  <span className="gh-lang-pct" style={{ color: l.color }}>{l.pct}%</span>
                  <span className="gh-lang-dot" style={{ background: l.color }} />
                </div>
              ))}
            </Glass>
          </ScanText>
        </div>
        <ScanText delay={0.1} className="gh-right">
          <Glass className="gh-grid-panel">
            <div className="gh-grid-header">
              <a className="gh-grid-title" href="https://github.com/Muchyz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}><I.Github s={13} />&nbsp;github.com/Muchyz</a>
              <span className="gh-grid-sub">2,847 contributions in the last year</span>
            </div>
            <div className="gh-months">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m} className="gh-month">{m}</span>)}</div>
            <div className="gh-grid-body">
              <div className="gh-day-labels">{["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => <span key={i} className="gh-day-label">{d}</span>)}</div>
              <div className="gh-cells">
                {GRID.map((week, wi) => (
                  <div key={wi} className="gh-week">
                    {week.map((val, di) => <div key={di} className="gh-cell" style={{ background: cellColor(val), boxShadow: val >= 3 ? `0 0 6px rgba(0,212,255,${val * 0.2})` : "none" }} />)}
                  </div>
                ))}
              </div>
            </div>
            <div className="gh-legend">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(v => <div key={v} className="gh-legend-cell" style={{ background: cellColor(v) }} />)}
              <span>More</span>
            </div>
          </Glass>
        </ScanText>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
function Architecture() {
  const layers = [
    { label: "CLIENT", items: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS"], color: "#00D4FF" },
    { label: "GATEWAY", items: ["Rate Limiting", "CORS", "Helmet.js", "Request Logger"], color: "#7B6EFF" },
    { label: "AUTH", items: ["JWT Verify", "RBAC Guard", "OAuth2 Flow", "2FA TOTP"], color: "#FF6B6B" },
    { label: "BUSINESS", items: ["Controllers", "Services", "Zod Validation", "Error Handler"], color: "#00FFB2" },
    { label: "DATA", items: ["PostgreSQL", "MongoDB", "Redis Cache", "Prisma ORM"], color: "#FFB800" },
  ];
  return (
    <section className="section">
      <ScanText className="section-eyebrow">// 06 — ARCHITECTURE</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>System <em>Design</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>Every request proves its identity before it is processed. Every layer has a purpose.</ScanText>
      <div className="arch-layout">
        <div className="arch-stack">
          {layers.map((layer, i) => (
            <ScanText key={layer.label} delay={0.1 + i * 0.07}>
              <Glass className="arch-layer" tilt>
                <div className="al-head"><div className="al-num" style={{ color: layer.color }}>0{i + 1}</div><div className="al-label" style={{ color: layer.color }}>{layer.label}</div></div>
                <div className="al-items">{layer.items.map(item => <span key={item} className="al-item" style={{ "--ic": layer.color }}>{item}</span>)}</div>
                {i < layers.length - 1 && <div className="al-arrow" style={{ color: layer.color }}>↓</div>}
              </Glass>
            </ScanText>
          ))}
        </div>
        <div className="arch-panels">
          <ScanText delay={0.15}><Glass className="code-panel"><div className="cp-header"><div className="cp-dots">{["#FF5F57", "#FFBD2E", "#28C840"].map(c => <span key={c} style={{ background: c }} />)}</div><span>src/ — structure</span><span className="cp-lang">BASH</span></div><pre className="cp-tree">{`src/\n├── config/\n│   ├── db.js\n│   └── redis.js\n├── middleware/\n│   ├── auth.js\n│   ├── rbac.js\n│   └── rateLimit.js\n├── modules/\n│   ├── auth/\n│   ├── users/\n│   └── orders/\n└── app.js`}</pre></Glass></ScanText>
          <ScanText delay={0.3}><Glass className="code-panel"><div className="cp-header"><div className="cp-dots">{["#FF5F57", "#FFBD2E", "#28C840"].map(c => <span key={c} style={{ background: c }} />)}</div><span>response.json</span><span className="cp-lang">JSON</span></div><pre className="cp-tree">{`// 200 OK\n{\n  "success": true,\n  "data": { ... },\n  "meta": {\n    "page": 1,\n    "total": 150\n  }\n}\n\n// 401\n{\n  "success": false,\n  "error": {\n    "code": "TOKEN_EXPIRED"\n  }\n}`}</pre></Glass></ScanText>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW I WORK
// ─────────────────────────────────────────────────────────────────────────────
function HowIWork() {
  const [active, setActive] = useState(0); const step = HOW_I_WORK[active];
  const go = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="process" className="section hiw-section">
      <ScanText className="section-eyebrow">// 07 — PROCESS</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>How I <em>work.</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>No surprises, no scope creep, no status theater. Just a clean process that ships.</ScanText>
      <div className="hiw-layout">
        <div className="hiw-nav">
          {HOW_I_WORK.map((s, i) => (
            <button key={s.step} className={`hiw-nav-item ${active === i ? "hiw-active" : ""}`} style={{ "--hc": s.color }} onClick={() => setActive(i)}>
              <span className="hiw-nav-step">{s.step}</span>
              <div className="hiw-nav-text"><div className="hiw-nav-title">{s.title}</div><div className="hiw-nav-duration">{s.duration}</div></div>
            </button>
          ))}
        </div>
        <div className="hiw-detail-wrap">
          <Glass key={active} tilt className="hiw-detail">
            <div className="hiw-detail-stripe" style={{ background: step.color }} />
            <div className="hiw-detail-icon" style={{ borderColor: `${step.color}40`, background: `${step.color}10`, color: step.color }}><step.Icon s={26} /></div>
            <div className="hiw-step-num" style={{ color: step.color }}>{step.step}</div>
            <div className="hiw-detail-title">{step.title}</div>
            <div className="hiw-detail-dur" style={{ color: step.color }}>{step.duration}</div>
            <p className="hiw-detail-desc">{step.desc}</p>
            <div className="hiw-deliverable" style={{ borderColor: `${step.color}30` }}>
              <I.Check s={14} />
              <span><strong>Deliverable:</strong> {step.deliverable}</span>
            </div>
          </Glass>
        </div>
      </div>
      <ScanText delay={0.3}>
        <Glass className="hiw-cta" glow>
          <div>
            <div className="hiw-cta-badge"><span className="nav-status-dot" />Available Now</div>
            <div className="hiw-cta-title">Ready to start with a discovery call?</div>
            <div className="hiw-cta-sub">30 minutes. Free. No pressure. You'll leave with clarity regardless.</div>
          </div>
          <button className="btn-primary btn-lg" onClick={go}>Book a Call&nbsp;<I.Arrow s={14} /></button>
        </Glass>
      </ScanText>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0); const t = TESTIMONIALS[active];
  return (
    <section id="testimonials" className="section">
      <ScanText className="section-eyebrow">// 08 — CLIENT RESULTS</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>Proof over <em>promises.</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>Real outcomes from real projects.</ScanText>
      <div className="testi-layout">
        <div className="testi-main">
          <Glass tilt className="testi-card">
            <div className="testi-quote-icon"><I.Quote s={36} /></div>
            <Chip label={t.industry} color={t.color} className="testi-industry-chip" />
            <p className="testi-quote">{t.quote}</p>
            <div className="testi-result" style={{ borderColor: `${t.color}40`, color: t.color, background: `${t.color}08` }}>
              <I.Check s={14} />&nbsp;{t.result}
            </div>
            <div className="testi-author">
              <div className="testi-avatar" style={{ borderColor: `${t.color}40`, background: `${t.color}10`, color: t.color }}>{t.avatar}</div>
              <div className="testi-author-text">
                <div className="testi-name">{t.name}</div>
                <div className="testi-title-co">{t.title} · {t.company}</div>
              </div>
              <div className="testi-stars">{Array.from({ length: t.stars }, (_, i) => <I.Star key={i} s={12} />).map((el, i) => <span key={i} style={{ color: "#FFB800" }}>{el}</span>)}</div>
            </div>
          </Glass>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => <button key={i} className={`testi-dot ${active === i ? "active" : ""}`} style={{ "--tc": TESTIMONIALS[i].color }} onClick={() => setActive(i)} />)}
          </div>
        </div>
        <div className="testi-side">
          {TESTIMONIALS.map((tm, i) => (
            <Glass key={i} className={`testi-mini ${active === i ? "" : ""}`} tilt onClick={() => setActive(i)} style={{ opacity: active === i ? 1 : 0.55, outline: active === i ? `1px solid ${tm.color}30` : undefined }}>
              <div className="testi-mini-top">
                <div className="testi-mini-avatar" style={{ borderColor: `${tm.color}40`, background: `${tm.color}10`, color: tm.color }}>{tm.avatar}</div>
                <div><div className="testi-mini-name">{tm.name}</div><div className="testi-mini-co">{tm.company}</div></div>
              </div>
              <div className="testi-mini-result" style={{ color: tm.color }}><I.Check s={10} />&nbsp;{tm.result}</div>
            </Glass>
          ))}
          <Glass className="trust-bar">
            <div className="trust-bar-title">Trusted By</div>
            <div className="trust-logos">{["FinVault", "OrderFlow", "Databridge", "Nexus Labs", "5+ Others"].map(n => <span key={n} className="trust-logo-item">{n}</span>)}</div>
          </Glass>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  const go = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="services" className="section">
      <ScanText className="section-eyebrow">// 09 — SERVICES</ScanText>
      <ScanText tag="h2" className="section-title" delay={0.08}>What I build <em>for you.</em></ScanText>
      <ScanText className="section-sub" delay={0.14}>Production-grade work. No shortcuts. If it ships under my name, it works.</ScanText>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <ScanText key={s.title} delay={0.1 + i * 0.07}>
            <Glass tilt className="service-item" onClick={go}>
              <div className="si-icon"><s.Icon s={24} /></div>
              <div className="si-body"><div className="si-title">{s.title}</div><div className="si-desc">{s.desc}</div></div>
              <div className="si-footer"><span className="si-price">{s.price}</span><span className="si-arrow"><I.Arrow s={16} /></span></div>
            </Glass>
          </ScanText>
        ))}
      </div>
      <ScanText delay={0.5}>
        <Glass className="services-cta" glow>
          <div className="scta-left">
            <div className="scta-title">Ready to ship something that matters?</div>
            <div className="scta-sub"><I.Cal s={11} />&nbsp;Limited availability · Response within 24h · Direct</div>
          </div>
          <button className="btn-primary btn-lg" onClick={go}>Book a Call&nbsp;<I.Arrow s={14} /></button>
        </Glass>
      </ScanText>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT — Wired with Formspree (xreadbrv)
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ID = "xreadbrv"; // ✅ Your Formspree form ID

function Contact() {
  const [sel, setSel] = useState([]);
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const types = ["Full-Stack App", "API Dev", "Auth System", "Dashboard", "Payments", "Code Audit"];
  const tog = (t) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
          projectTypes: sel.join(", ") || "Not specified",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
        setSel([]); setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="contact-layout">
        <div>
          <ScanText className="section-eyebrow">// 10 — CONTACT</ScanText>
          <ScanText tag="h2" className="contact-title" delay={0.08}>
            Let's build<br />something<br /><em>exceptional.</em>
          </ScanText>
          <ScanText className="contact-body" delay={0.16}>
            Open to full-time roles, freelance projects, and interesting engineering conversations.
          </ScanText>
          <div className="contact-channels">
            {CHANNELS.map((c, i) => (
              <ScanText key={c.label} delay={0.2 + i * 0.07}>
                <a href={c.href} target={c.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer" className="contact-ch">
                  <span className="cch-icon"><c.Icon s={14} /></span>
                  <div className="cch-text">
                    <div className="cch-label">{c.label} · <em>{c.hint}</em></div>
                    <div className="cch-val">{c.value}</div>
                  </div>
                  <span className="cch-arr"><I.Arrow s={14} /></span>
                </a>
              </ScanText>
            ))}
          </div>
          <ScanText delay={0.6}>
            <Glass className="avail-panel">
              <span className="nav-status-dot" />
              <div>
                <div className="avail-title">Available for new projects</div>
                <div className="avail-sub">Starting March 2025 · Remote Worldwide</div>
              </div>
            </Glass>
          </ScanText>
        </div>

        <ScanText delay={0.18}>
          <Glass tilt className="contact-form">

            {/* SUCCESS */}
            {status === "success" && (
              <div className="form-success">
                <div className="fs-icon"><I.Check s={24} /></div>
                <div className="fs-title">Message Sent!</div>
                <div className="fs-body">I'll get back to you within 24 hours.</div>
              </div>
            )}

            {/* ERROR */}
            {status === "error" && (
              <div className="form-success">
                <div className="fs-icon" style={{ background: "rgba(255,107,107,.1)", border: "1px solid rgba(255,107,107,.3)", color: "#FF6B6B" }}>
                  <I.X s={24} />
                </div>
                <div className="fs-title" style={{ color: "#FF6B6B" }}>Something went wrong</div>
                <div className="fs-body">Please try again or email me directly.</div>
                <button className="btn-ghost" style={{ marginTop: 16 }} onClick={() => setStatus("idle")}>Try Again</button>
              </div>
            )}

            {/* FORM */}
            {(status === "idle" || status === "sending") && (
              <>
                <div className="cf-header">
                  <div className="cf-title">Send a Message</div>
                  <div className="cf-note">Direct to Kelvin. No middlemen.</div>
                </div>
                <div className="cf-row2">
                  <div className="cf-field">
                    <label>Name</label>
                    <input name="name" placeholder="Your full name" value={fields.name} onChange={handleChange}
                      style={errors.name ? { borderColor: "rgba(255,107,107,.6)" } : {}} />
                    {errors.name && <span className="cf-error">{errors.name}</span>}
                  </div>
                  <div className="cf-field">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="you@company.com" value={fields.email} onChange={handleChange}
                      style={errors.email ? { borderColor: "rgba(255,107,107,.6)" } : {}} />
                    {errors.email && <span className="cf-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="cf-field">
                  <label>Project Type <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
                  <div className="cf-chips">
                    {types.map((t) => (
                      <button key={t} type="button" className={`cf-chip ${sel.includes(t) ? "active" : ""}`} onClick={() => tog(t)}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="cf-field">
                  <label>Message</label>
                  <textarea name="message" rows={5} placeholder="Project details, timeline, and budget."
                    value={fields.message} onChange={handleChange}
                    style={errors.message ? { borderColor: "rgba(255,107,107,.6)" } : {}} />
                  {errors.message && <span className="cf-error">{errors.message}</span>}
                </div>
                <button className="btn-primary btn-full" onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={status === "sending" ? { opacity: 0.7, cursor: "not-allowed" } : {}}>
                  {status === "sending"
                    ? <> Sending&nbsp;<span className="cf-spinner" /></>
                    : <> Send Message&nbsp;<I.Send s={13} /></>}
                </button>
              </>
            )}
          </Glass>
        </ScanText>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const socials = [
    { Icon: I.Github, href: "https://github.com/Muchyz", label: "GitHub" },
    { Icon: I.Li, href: "https://www.linkedin.com/in/kelvin-muchiri-830aa2391", label: "LinkedIn" },
    { Icon: I.Instagram, href: "https://www.instagram.com/kelvin__muchiri", label: "Instagram" },
    { Icon: I.WhatsApp, href: "https://wa.me/254705427449", label: "WhatsApp" },
    { Icon: I.Mail, href: "mailto:kelvinmuchiri699@gmail.com", label: "Email" },
  ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand"><I.Hex s={18} /><span>KELVIN<em>.</em></span></div>
        <div className="footer-copy">© {new Date().getFullYear()} Kelvin Muchiri · Built with React</div>
        <div className="footer-socials">
          {socials.map(({ Icon, href, label }) => (
            <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
              className="footer-social-icon" aria-label={label} title={label}>
              <Icon s={16} />
            </a>
          ))}
        </div>
        <nav className="footer-links">
          {[["projects", "Work"], ["about", "About"], ["skills", "Skills"], ["contact", "Contact"]].map(([id, label]) => (
            <button key={id} className="footer-link" onClick={(e) => go(e, id)}>{label}</button>
          ))}
        </nav>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fn = e => { mousePos.current.x = e.clientX / window.innerWidth; mousePos.current.y = e.clientY / window.innerHeight; };
    window.addEventListener("mousemove", fn, { passive: true }); return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Cursor />
      <Nav scrolled={scrolled} progress={progress} />
      <main>
        <Hero mousePos={mousePos} />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <GitHubStats />
        <Architecture />
        <HowIWork />
        <Testimonials />
        <Services />
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
    </>
  );
}
