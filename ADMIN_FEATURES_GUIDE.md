# 👑 Admin Features - Visual Location Guide

## 🎯 Where to Find Admin Features

This guide shows you exactly where all admin features are located in the UI.

---

## 1. 🔐 Login as Admin

### Step 1: Click "Login" Button
```
┌─────────────────────────────────────────────────────┐
│  Merakicode  Problemset  Home    [Search]  [Login] │ ← Click here
└─────────────────────────────────────────────────────┘
```

### Step 2: See Admin Credentials
```
┌──────────────────────────────────────┐
│  Sign In                         [X] │
├──────────────────────────────────────┤
│  Username: [____________]            │
│  Password: [____________]            │
│                                      │
│  [Sign In]                           │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐ │
│  │ 👑 Admin Access:               │ │ ← Admin credentials here!
│  │ username: admin                │ │
│  │ password: admin123             │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### Step 3: Enter Credentials
```
Username: admin
Password: admin123
```

### Step 4: Click "Sign In"

---

## 2. 📝 Create Problem Button

### Location: Top-Right of Problem List

```
┌─────────────────────────────────────────────────────────────┐
│  Problems                          [➕ Create Problem]      │ ← HERE!
├─────────────────────────────────────────────────────────────┤
│  PROBLEM NAME  │  CREATOR  │  STATUS  │  RATING  │ ACTIONS │
├─────────────────────────────────────────────────────────────┤
│  Two Sum       │  admin    │    ○     │   800    │  [🗑️]   │
│  Three Sum     │  john     │    ○     │   900    │  [🗑️]   │
└─────────────────────────────────────────────────────────────┘
```

**What it looks like:**
- Blue button
- Plus icon (➕)
- Text: "Create Problem"
- Located at top-right corner

**What it does:**
- Redirects to Admin Panel
- Opens problem creation form

---

## 3. 🗑️ Delete Problem Buttons

### Location: Last Column of Each Problem Row

```
┌─────────────────────────────────────────────────────────────┐
│  PROBLEM NAME  │  CREATOR  │  STATUS  │  RATING  │ ACTIONS │
├─────────────────────────────────────────────────────────────┤
│  Two Sum       │  admin    │    ○     │   800    │  [🗑️]   │ ← HERE!
│  Three Sum     │  john     │    ○     │   900    │  [🗑️]   │ ← HERE!
│  Valid Parens  │  System   │    ○     │   700    │  [🗑️]   │ ← HERE!
└─────────────────────────────────────────────────────────────┘
```

**What it looks like:**
- Red trash icon (🗑️)
- Appears on hover
- One per problem row
- In "ACTIONS" column

**What it does:**
1. Click → Confirmation dialog appears
2. Confirm → Problem deleted
3. List refreshes automatically

---

## 4. 👑 Admin Panel Link

### Location: User Profile Sidebar

```
┌─────────────────────────────────┐
│  → admin                        │
│                                 │
│  📧 Email: admin@example.com    │
│  👑 Role: ADMIN                 │
│  📅 Joined: Dec 4, 2024         │
│                                 │
│  [A]  (Avatar)                  │
│                                 │
│  Problems                       │
│  Submissions                    │
│  Contests                       │
│  👑 Admin Panel  ← HERE!        │
└─────────────────────────────────┘
```

**What it looks like:**
- Purple text
- Crown icon (👑)
- Bold font
- At bottom of sidebar links

**What it does:**
- Opens full Admin Panel
- Access to all admin features
- User management
- Statistics

---

## 5. 🛡️ Admin Badge in Navbar

### Location: User Menu (Top-Right)

```
┌─────────────────────────────────────────────────────────┐
│  Merakicode  Problemset  Home    [Search]  [👤 admin 🛡️] │ ← Shield icon
└─────────────────────────────────────────────────────────┘
```

**What it looks like:**
- Small shield icon (🛡️)
- Next to username
- In navbar dropdown

**What it shows:**
- You're logged in as admin
- Visual confirmation of admin status

---

## 6. 📄 Pagination Controls

### Location: Bottom of Problem List

```
┌─────────────────────────────────────────────────────────────┐
│  Two Sum       │  admin    │    ○     │   800    │  [🗑️]   │
│  Three Sum     │  john     │    ○     │   900    │  [🗑️]   │
│  ...                                                        │
├─────────────────────────────────────────────────────────────┤
│  Showing 1 to 7 of 25 problems                             │
│                                                             │
│  [Previous] [1] [2] [3] ... [8] [Next]  ← Pagination here! │
└─────────────────────────────────────────────────────────────┘
```

**What it looks like:**
- Previous/Next buttons (blue)
- Page numbers (1, 2, 3...)
- Current page highlighted
- Shows problem count

**How to use:**
- Click page numbers to jump
- Click Previous/Next to navigate
- 7 problems per page

---

## 🎯 Complete Admin Workflow

### Creating a Problem:

```
1. Login as admin
   ↓
2. Go to Problemset page
   ↓
3. Click "Create Problem" button (top-right)
   ↓
4. Redirected to Admin Panel
   ↓
5. Fill in problem form
   ↓
6. Submit
   ↓
7. Problem created with your username as creator
```

### Deleting a Problem:

```
1. Login as admin
   ↓
2. Go to Problemset page
   ↓
3. Find problem to delete
   ↓
4. Click delete button (🗑️) in ACTIONS column
   ↓
5. Confirmation dialog appears
   ↓
6. Click "OK" to confirm
   ↓
7. Problem deleted, list refreshes
```

### Managing Users:

```
1. Login as admin
   ↓
2. Click "Admin Panel" in sidebar
   ↓
3. Go to "Users" tab
   ↓
4. Find user to modify
   ↓
5. Change role or status
   ↓
6. User updated
```

---

## 🔍 Visual Differences: Admin vs Regular User

### Regular User View:
```
┌─────────────────────────────────────────────────────────────┐
│  Problems                                                   │ ← No button
├─────────────────────────────────────────────────────────────┤
│  PROBLEM NAME  │  CREATOR  │  STATUS  │  RATING  │  TAGS   │
├─────────────────────────────────────────────────────────────┤
│  Two Sum       │  admin    │    ○     │   800    │  array  │ ← No delete
│  Three Sum     │  john     │    ○     │   900    │  array  │
└─────────────────────────────────────────────────────────────┘

Sidebar:
- Problems
- Submissions
- Contests
(No Admin Panel link)
```

### Admin User View:
```
┌─────────────────────────────────────────────────────────────┐
│  Problems                          [➕ Create Problem]      │ ← Button!
├─────────────────────────────────────────────────────────────┤
│  PROBLEM NAME  │  CREATOR  │  STATUS  │  RATING  │ ACTIONS │
├─────────────────────────────────────────────────────────────┤
│  Two Sum       │  admin    │    ○     │   800    │  [🗑️]   │ ← Delete!
│  Three Sum     │  john     │    ○     │   900    │  [🗑️]   │
└─────────────────────────────────────────────────────────────┘

Sidebar:
- Problems
- Submissions
- Contests
- 👑 Admin Panel  ← Extra link!
```

---

## 🎨 Color Coding

### Admin Elements:
```
Create Button:    Blue (#2563EB)
Delete Button:    Red (#DC2626)
Admin Panel Link: Purple (#9333EA)
Admin Role Badge: Purple (#7C3AED)
Crown Icon:       Gold/Yellow
Shield Icon:      Gray
```

### Visual Indicators:
- 👑 Crown = Admin role
- 🛡️ Shield = Admin user in navbar
- Purple text = Admin-only features
- Blue buttons = Primary actions
- Red buttons = Destructive actions

---

## 📱 Mobile View

### Admin Features on Mobile:

```
┌──────────────────────┐
│  [☰] Merakicode     │
├──────────────────────┤
│  Problems            │
│  [➕ Create]         │ ← Smaller button
├──────────────────────┤
│  Two Sum    [🗑️]     │ ← Compact
│  Three Sum  [🗑️]     │
├──────────────────────┤
│  [Prev] 1 2 [Next]   │ ← Compact pagination
├──────────────────────┤
│  Profile             │
│  - admin             │
│  - 👑 Admin Panel    │
└──────────────────────┘
```

---

## ⚠️ Troubleshooting

### "I don't see the Create Problem button"
**Check:**
- [ ] Are you logged in as admin?
- [ ] Username is "admin"?
- [ ] On the Problemset page?
- [ ] Browser window wide enough?

### "I don't see delete buttons"
**Check:**
- [ ] Logged in as admin?
- [ ] Looking in ACTIONS column?
- [ ] Hovering over the button?

### "Admin Panel link not in sidebar"
**Check:**
- [ ] Logged in as admin?
- [ ] Role shows "ADMIN" in profile?
- [ ] Scrolled down in sidebar?

### "Can't login as admin"
**Try:**
- Username: `admin` (lowercase)
- Password: `admin123` (no spaces)
- Check backend is running
- Check browser console for errors

---

## 🎯 Quick Reference

| Feature | Location | Visibility |
|---------|----------|------------|
| Create Button | Top-right of problem list | Admin only |
| Delete Buttons | ACTIONS column, each row | Admin only |
| Admin Panel Link | Sidebar, bottom | Admin only |
| Admin Badge | Navbar, user menu | Admin only |
| Pagination | Bottom of problem list | Everyone |
| Creator Names | CREATOR column | Everyone |

---

## 🚀 Getting Started

### First Time Setup:

1. **Start Backend:**
   ```bash
   cd backend
   node app.js
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser:**
   ```
   http://localhost:5173
   ```

4. **Login as Admin:**
   - Click "Login"
   - Username: `admin`
   - Password: `admin123`
   - Click "Sign In"

5. **Verify Admin Access:**
   - See "Create Problem" button? ✅
   - See delete buttons? ✅
   - See "Admin Panel" in sidebar? ✅
   - See crown icon in profile? ✅

**If all checked, you're ready to go! 🎉**

---

## 📞 Need Help?

### Common Questions:

**Q: How do I create more admins?**
A: Login as admin → Admin Panel → Users tab → Change user role to ADMIN

**Q: Can I change admin password?**
A: Yes, in Admin Panel → Users tab → Edit admin user

**Q: How many problems per page?**
A: 7 problems per page (configurable in code)

**Q: Can regular users see creator names?**
A: Yes, everyone can see who created each problem

**Q: What happens if I delete a problem?**
A: Problem and all its test cases are permanently deleted

---

**All admin features are now visible and easy to find! 👑**
