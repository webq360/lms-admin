# LMS-ADMIN — Enterprise LMS Super Admin Console

A complete Next.js 14+ (App Router) executive control console for managing platform operations, course approvals, user directories, bonus gift logistics, coupons, orders, audit logs, and system settings.

---

## 🌟 Key Modules

1. **Executive Dashboard**:
   - Gross revenue KPI, Monthly sales, Active students count, Completed orders count
   - Monthly sales velocity charts
   - Instant review queue & gift logistics shortcuts

2. **Course Moderation & Quality Assurance**:
   - Approve, Reject, or request revisions on instructor course submissions
   - Real-time status toggling (`PENDING_REVIEW` ➔ `PUBLISHED` / `REJECTED`)

3. **User Management & RBAC**:
   - Full student, teacher, and administrative staff directory
   - Account suspension & reactivations
   - Role & custom granular permissions assigner

4. **Bonus Gift Logistics & Dispatch**:
   - Inventory tracking
   - Courier assignment & tracking number updater (`PENDING` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`)

5. **Coupons & Promotions**:
   - Create percentage/fixed promotional discount codes
   - Minimum order requirements & validity period management

6. **Orders, Invoices & Refunds**:
   - Complete transaction log across all payment gateways
   - Immediate refund authorization

7. **Audit Log Trail**:
   - Immutable security and compliance log of all administrative actions with IP and timestamps

8. **System Settings**:
   - Multi-gateway payment router (SSLCommerz, bKash, Nagad, Rocket, Stripe, Mock)
   - Video CDN DRM settings & SMTP notification dispatchers

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
```

### 3. Start Console
```bash
npm run dev
```
Open `http://localhost:3001` in your browser.

