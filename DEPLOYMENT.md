# CareerPilot AI - Deployment Guide

## ✅ DEPLOYMENT READY FOR VERCEL & HOSTINGER

This project has been fully optimized and tested for deployment on both Vercel and Hostinger hosting platforms.

---

## 🚀 Vercel Deployment

### Prerequisites
1. GitHub account
2. Vercel account (free tier works)
3. Environment variables ready

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Project ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   GOOGLE_GEMINI_API_KEY=your_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

---

## 🏠 Hostinger Deployment

### Prerequisites
1. Hostinger VPS or Node.js hosting plan
2. SSH access
3. Node.js 18+ installed

### Steps

1. **Connect via SSH**
   ```bash
   ssh username@your-server-ip
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/your-username/career-pilot-ai.git
   cd career-pilot-ai
   ```

3. **Install Dependencies**
   ```bash
   npm install --production
   ```

4. **Create .env.local**
   ```bash
   nano .env.local
   ```
   Paste your environment variables

5. **Build Project**
   ```bash
   npm run build
   ```

6. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "careerpilot" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔧 Environment Variables

Required for both platforms:

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GEMINI_API_KEY` | Google Gemini AI API key | ✅ Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | ✅ Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL (same as APP_URL) | ✅ Yes |
| `DATABASE_URL` | Database connection string | ⚠️ Optional |

---

## ✅ Pre-Deployment Checklist

- [x] All API routes use proper Next.js 15 format
- [x] Environment variables configured
- [x] `next.config.mjs` set to `output: 'standalone'`
- [x] No console.log in production code
- [x] All imports resolved correctly
- [x] Dark mode fully functional
- [x] All components have proper "use client" directives
- [x] No browser APIs (window, document) in server components
- [x] vercel.json configured
- [x] .htaccess for Hostinger ready
- [x] .env.example provided

---

## 🧪 Local Testing

Before deployment, test locally:

```bash
# Clean build
npm run clean
npm install

# Build production
npm run build

# Test production build
npm start
```

Access at: http://localhost:3000

---

## 🐛 Common Issues & Fixes

### Issue: Build fails with "window is not defined"
**Fix:** Add "use client" directive to components using browser APIs

### Issue: API routes return 404
**Fix:** Ensure routes are in `app/api/[route]/route.js` format

### Issue: Environment variables not working
**Fix:** Restart dev server after changing .env.local

### Issue: Images not loading
**Fix:** Check next.config.mjs image domains configuration

### Issue: Dark mode not working
**Fix:** Ensure ThemeContext is properly imported and used

---

## 📊 Performance Optimization

Already implemented:
- ✅ Image optimization with Next.js Image
- ✅ Code splitting & lazy loading
- ✅ Tailwind CSS purging
- ✅ Compression enabled
- ✅ Caching headers configured

---

## 🔒 Security

Implemented security features:
- ✅ Clerk authentication
- ✅ Environment variable protection
- ✅ API route protection
- ✅ XSS protection headers
- ✅ CSRF protection

---

## 📝 Post-Deployment

1. **Test all features**
   - Authentication (Sign in/up)
   - API routes
   - Dark mode toggle
   - All navigation links

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor API response times
   - Check error logs

3. **Set up Custom Domain** (Optional)
   - Vercel: Add domain in settings
   - Hostinger: Update DNS records

---

## 🆘 Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check browser console for errors

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Site loads without errors
- ✅ Authentication works
- ✅ All pages accessible
- ✅ API routes functional
- ✅ Dark mode toggles properly
- ✅ No console errors

---

**Last Updated:** November 29, 2025
**Project Version:** 1.0.0
**Next.js Version:** 15.1.3
