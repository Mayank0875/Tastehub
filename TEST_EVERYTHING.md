# 🧪 Complete Testing Guide - CRITICAL

## ⚠️ MUST TEST BEFORE SUBMISSION

### Quick Test (2 minutes):

```bash
# Terminal 1: Backend
cd backend
node app.js

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Test Checklist:

1. **Open Browser:** http://localhost:5173
   - [ ] Page loads
   - [ ] See problems list
   - [ ] See 12 problems

2. **Click First Problem:**
   - [ ] Problem details page loads
   - [ ] See title, description, constraints
   - [ ] See sample input/output
   - [ ] See code editor

3. **Click "Back to Problemset":**
   - [ ] Returns to problem list
   - [ ] Problems still visible
   - [ ] All 12 problems shown

4. **Navigate Multiple Times:**
   - [ ] Click problem → back → click another → back
   - [ ] Problems persist each time

5. **Check Browser Console:**
   - [ ] No red errors
   - [ ] See "Fetched X problems"
   - [ ] See "Using cached problems" on subsequent loads

### If ANY test fails:

1. **Check Backend Logs:**
   ```bash
   # Should see:
   Server is running on port 3030
   ```

2. **Test Backend Directly:**
   ```bash
   curl http://localhost:3030/problem
   # Should return JSON with problems
   
   curl http://localhost:3030/problem/1
   # Should return single problem
   ```

3. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for errors

4. **Clear Cache:**
   - Press Ctrl+Shift+R (hard refresh)
   - Or clear browser cache

### Expected Behavior:

✅ **Working:**
- Problems load on first visit
- Problem details show when clicked
- Problems persist when navigating back
- No blank pages
- No console errors

❌ **Not Working (FAIL):**
- Blank page when clicking problem
- Problems disappear after navigation
- Console shows errors
- Infinite loading

### Debug Commands:

```bash
# Check if backend is running
curl http://localhost:3030

# Check if problems endpoint works
curl http://localhost:3030/problem | python3 -m json.tool

# Check single problem
curl http://localhost:3030/problem/1 | python3 -m json.tool

# Check database
cd backend
npx prisma studio
# Open browser, check Problem table
```

### Common Issues:

**Issue: Blank page on problem details**
- Check browser console for errors
- Verify backend is running
- Test API endpoint directly

**Issue: Problems disappear**
- Check AppContext is wrapping App
- Verify fetchProblems is called
- Check browser console

**Issue: Nothing loads**
- Restart backend
- Clear browser cache
- Check port 3030 is free

### Final Verification:

Run this complete flow 3 times:
1. Home → Problemset → Problem 1 → Back → Problem 2 → Back
2. Problemset → Problem 5 → Back → Problem 10 → Back
3. Problemset → Problem 12 → Back → Problemset

If all 3 flows work without issues: ✅ READY FOR SUBMISSION

If any flow fails: ❌ FIX IMMEDIATELY
