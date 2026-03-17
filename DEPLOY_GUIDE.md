# 🚀 Zip Innovate Technology — Deployment Guide

Deploy this landing page on **zipinnovate.com** and **zipinnovate.in** using Vercel or Netlify (both free).

---

## 📁 Project Files

```
zip-innovate-deploy/
├── index.html          ← Your landing page
├── vercel.json         ← Vercel config
├── netlify.toml        ← Netlify config
├── GoogleAppsScript_ContactForm.js  ← Google Sheets script
└── DEPLOY_GUIDE.md     ← This file
```

---

## OPTION A: Deploy with Vercel (Recommended)

### Step 1: Push to GitHub
```bash
# Create a new repo on github.com called "zip-innovate-site"
# Then in your terminal:

cd zip-innovate-deploy
git init
git add .
git commit -m "Zip Innovate Technology landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zip-innovate-site.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **https://vercel.com** → Sign in with GitHub
2. Click **"Add New Project"**
3. Select your **zip-innovate-site** repo
4. Framework Preset: **Other**
5. Click **Deploy** — wait 30 seconds

### Step 3: Connect zipinnovate.com
1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Type `zipinnovate.com` → Click **Add**
3. Vercel will show you DNS records. Go to your domain registrar and:
   - **Option A (Recommended):** Add an **A record** pointing to `76.76.21.21`
   - **Option B:** Add a **CNAME record** pointing to `cname.vercel-dns.com`
4. Wait 5-30 minutes for DNS propagation

### Step 4: Connect zipinnovate.in
1. Same Domains page → Type `zipinnovate.in` → Click **Add**
2. Add the same DNS records at your registrar for the .in domain:
   - **A record** → `76.76.21.21`
   - Or **CNAME** → `cname.vercel-dns.com`
3. Vercel auto-provisions SSL certificates for both domains

### ✅ Done! Both domains now serve the same site with free HTTPS.

---

## OPTION B: Deploy with Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy on Netlify
1. Go to **https://app.netlify.com** → Sign in with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your **zip-innovate-site** repo
4. Build settings:
   - Build command: *(leave empty)*
   - Publish directory: `.`
5. Click **Deploy site**

### Step 3: Connect zipinnovate.com
1. In Netlify → your site → **Domain management** → **Add custom domain**
2. Type `zipinnovate.com` → Click **Verify** → **Add domain**
3. Go to your domain registrar and update DNS:
   - Add **A record** → Netlify's load balancer IP (shown in dashboard)
   - Or add **CNAME** → `your-site-name.netlify.app`
4. Back in Netlify → Click **Verify DNS configuration**
5. Enable **HTTPS** → Click **Provision certificate**

### Step 4: Connect zipinnovate.in
1. Same Domain management → **Add custom domain**
2. Type `zipinnovate.in` → Follow same DNS steps
3. Netlify provisions a separate SSL cert automatically

---

## 🔗 Connect Google Sheets (Private Form Data)

### Step 1: Create Your Sheet
1. Go to **https://sheets.google.com** → Create new spreadsheet
2. Name it: `Zip Innovate - Contact Submissions`
3. In **Row 1**, add these headers:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | Company | Service | Budget | Message |

### Step 2: Add the Script
1. In your sheet → **Extensions** → **Apps Script**
2. Delete all existing code
3. Paste the code from `GoogleAppsScript_ContactForm.js`
4. Click **Save** (💾)

### Step 3: Deploy the Script
1. Click **Deploy** → **New deployment**
2. Click ⚙️ gear → Select **Web app**
3. Settings:
   - Description: `Contact Form Handler`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → Choose your Google account → **Allow**
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/xxxxx/exec`)

### Step 4: Update Your Site
1. Open `index.html`
2. Find this line near the bottom:
   ```javascript
   const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace with your actual URL:
   ```javascript
   const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
   ```
4. Save, commit, and push:
   ```bash
   git add .
   git commit -m "Add Google Sheets integration"
   git push
   ```
5. Vercel/Netlify auto-deploys within 30 seconds

### ✅ Every form submission now silently saves to your private Google Sheet!

---

## 🌐 DNS Records Cheat Sheet

### For Vercel:
| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### For Netlify:
| Type | Name | Value |
|------|------|-------|
| A | @ | 75.2.60.5 |
| CNAME | www | your-site.netlify.app |

> Apply these DNS records for **both** zipinnovate.com and zipinnovate.in

---

## 🔄 Making Updates

After any changes to `index.html`:
```bash
git add .
git commit -m "Update landing page"
git push
```
Vercel/Netlify auto-deploys in ~30 seconds. Both domains update simultaneously since they point to the same project.

---

## ❓ Troubleshooting

| Issue | Fix |
|-------|-----|
| Domain not working | DNS takes up to 48 hours. Check with `dig zipinnovate.com` |
| No HTTPS padlock | Wait 10 min — SSL is auto-provisioned |
| Form not saving | Check Google Sheet URL is correct & script is deployed |
| Blank page | Make sure file is named `index.html` |
| Old site showing | Clear browser cache (Ctrl+Shift+R) |
