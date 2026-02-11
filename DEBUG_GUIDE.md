# 🔍 API Debugging Guide

## Checking API Integration Locally

### 1. **Browser Console Logs**
Ketika app berjalan, buka DevTools (F12) dan lihat Console tab untuk logs:

```
Fetching from: https://backend-portfolio-ben.vercel.app/journeys
Fetching works from: https://backend-portfolio-ben.vercel.app/works
Submitting contact to: https://backend-portfolio-ben.vercel.app/contact
```

### 2. **Network Tab**
DevTools → Network tab:
- Filter by "Fetch/XHR"
- Expand request untuk lihat:
  - **Headers**: Check Authorization (jika ada)
  - **Response**: Verify response format `{ data: [...] }`
  - **Status**: Should be 200 OK

### 3. **Common Status Codes**
| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | ✅ All good |
| 400 | Bad Request | Check request body format |
| 401 | Unauthorized | Check auth token di localStorage |
| 404 | Not Found | Check endpoint URL |
| 500 | Server Error | Backend issue, check backend logs |
| Network Error | No connection | Backend offline atau CORS blocked |

### 4. **Testing Endpoints Manually**

#### Journey API:
```bash
curl -X GET "https://backend-portfolio-ben.vercel.app/journeys" \
  -H "Accept: application/json"
```

#### Works API:
```bash
curl -X GET "https://backend-portfolio-ben.vercel.app/works" \
  -H "Accept: application/json"
```

#### Contact API (Create):
```bash
curl -X POST "https://backend-portfolio-ben.vercel.app/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "subject": "Test",
    "phone": "123456",
    "message": "Test message"
  }'
```

---

## Expected Response Formats

### Journey List Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "String",
      "type": "Education|Work|Organization",
      "year": 2024,
      "order_index": 1,
      "cover_image": "/path/to/image.jpg",
      "excerpt": "Short description",
      "content": "Full content"
    }
  ]
}
```

### Works List Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Project Name",
      "excerpt": "Description",
      "cover_image": "/path/to/image.jpg",
      "github_url": "https://...",
      "demo_url": "https://...",
      "drive_url": "https://...",
      "status": "completed|ongoing"
    }
  ]
}
```

### Contact Create Response:
```json
{
  "data": {
    "id": 1,
    "name": "User",
    "email": "user@example.com",
    "subject": "Subject",
    "phone": "123456",
    "message": "Message",
    "status": "unread",
    "created_at": "2024-02-11T..."
  }
}
```

---

## Environment Variable Verification

### Check if env var loaded correctly:
Add temporary console.log di any page:
```typescript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

Should output: `API URL: https://backend-portfolio-ben.vercel.app`

### For Next.js Dev Server:
1. Pastikan menggunakan `.env.local` untuk local dev
2. Restart dev server setelah mengubah `.env` atau `.env.local`
3. Clear Next.js cache: `rm -rf .next/`

---

## Error Patterns & Solutions

### "Failed to fetch journeys"
**Cause**: API endpoint tidak accessible
**Solution**: 
- Verify backend URL correct
- Check network connectivity
- Verify CORS headers di backend

### "Invalid data format"
**Cause**: Response bukan array
**Solution**:
- Check API response format
- Verify it returns `{ data: [...] }`
- Not `{ journeys: [...] }` atau langsung `[...]`

### "Unauthorized: please login as admin"
**Cause**: Token not di localStorage
**Solution**:
- Login terlebih dahulu di `/login`
- Token disave ke localStorage
- Refresh page setelah login

### "NetworkError when attempting to fetch resource"
**Cause**: CORS blocked atau backend offline
**Solution**:
- Verify backend deployed & accessible
- Check CORS headers di backend
- Check frontend URL whitelisted di backend

---

## Performance Tips

1. **Caching**: Journey/Works pages sudah cache-friendly
2. **Error Boundaries**: Graceful fallback di semua pages
3. **Logging**: Console logs untuk debugging tanpa errors

---

## Local Testing Before Deploying

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate ke setiap page:**
   - `/home` → cek styling
   - `/journey` → cek data loading
   - `/portfolio` → cek carousel
   - `/contact` → cek form submission
   - `/admin/*` → cek if accessible

3. **Open DevTools Console** dan verify:
   - Fetch logs appear
   - No JavaScript errors
   - Status 200 untuk API calls

4. **Check Network Tab:**
   - All requests complete
   - Response times reasonable
   - No failed requests

---

## Final Checklist Before Vercel Deploy

- [ ] npm run build succeeds locally
- [ ] No console errors ketika run dev
- [ ] .env.local updated with correct API URL
- [ ] All pages accessible dan load data
- [ ] Error handling gracefully falls back
- [ ] Git committed semua changes
- [ ] Ready untuk push to main

**Once all checked ✅ → Deploy ke Vercel!**
