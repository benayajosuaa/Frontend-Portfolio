# 🚀 DEPLOYMENT GUIDE - Vercel Frontend

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables Setup**
- ✅ `.env` - Production configuration
- ✅ `.env.local` - Local development configuration

**Vercel Environment Variable yang harus di-set:**
```
NEXT_PUBLIC_API_URL=https://backend-portfolio-ben.vercel.app
```

### 2. **Code Quality Checks**
- ✅ No TypeScript errors
- ✅ Error handling implemented
- ✅ Logging in place for debugging
- ✅ Graceful fallback untuk failed API calls

### 3. **API Integration Status**
- ✅ Journey API (`/journeys`) - dengan error handling
- ✅ Work API (`/works`) - dengan error handling  
- ✅ Contact API (`/contact`) - dengan error handling
- ✅ Admin Contact API (`/contact/:id/status`) - dengan auth headers

---

## 📋 What Was Fixed

### Error Handling Improvements:
1. **Journey Page**
   - Added try-catch wrapper
   - Returns empty array on error instead of throwing
   - Logs API URL untuk debugging

2. **Portfolio Page**
   - Better error handling di useEffect
   - Sets empty array fallback on API error
   - Logs fetch errors

3. **Contact Form Page**
   - Proper error/success state management
   - Better error messages
   - Logs submission URL

4. **Admin Pages**
   - Enhanced fetch error handling
   - Better logging dengan URL tracing
   - Graceful degradation

---

## 🌐 Deployment Steps

### Via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select "Frontend-Portfolio" project
3. Settings → Environment Variables
4. Add/Update: `NEXT_PUBLIC_API_URL=https://backend-portfolio-ben.vercel.app`
5. Deploy button akan otomatis trigger
6. Or: Push to main branch untuk auto-deploy

### Via CLI:
```bash
vercel deploy --prod
```

---

## 🔍 Post-Deployment Checks

1. **Test Homepage**
   - Verify styling intact
   - Check navigation works

2. **Test Journey Page**
   - Should load journey data from API
   - Check browser console untuk fetch logs
   - Verify graceful fallback jika API down

3. **Test Portfolio Page**
   - Should load works data
   - Carousel navigation functional
   - Images loading correctly

4. **Test Contact Form**
   - Form submission should work
   - Error messages display correctly
   - Success message appears

5. **Admin Pages** (if accessible)
   - Login functionality
   - Data loading from API
   - CRUD operations work

---

## 🆘 Troubleshooting

### If you see "NetworkError when attempting to fetch":
1. Check API URL di Vercel env variables
2. Verify backend is accessible at `https://backend-portfolio-ben.vercel.app`
3. Check CORS settings di backend

### If data not loading:
1. Open browser DevTools → Console
2. Look for fetch logs like: "Fetching from: https://backend-portfolio-ben.vercel.app/journeys"
3. Check Network tab untuk actual request
4. Verify API response format: `{ data: [...] }`

### If auth issues (Admin pages):
1. Check localStorage token after login
2. Verify Authorization header being sent
3. Ensure token tidak expired

---

## 📝 Environment Variables Reference

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://backend-portfolio-ben.vercel.app` | Production (Vercel) |
| `NEXT_PUBLIC_API_URL` | `https://backend-portfolio-ben.vercel.app` | Local Dev (.env.local) |

**Note:** Prefix `NEXT_PUBLIC_` membuat variable accessible di browser (client-side)

---

## 🎯 Summary

Frontend Anda sekarang siap untuk production dengan:
- ✅ Proper error handling
- ✅ Detailed logging untuk debugging
- ✅ Graceful fallbacks
- ✅ Environment-based configuration
- ✅ No hardcoded URLs

**Ready to deploy! 🚀**
