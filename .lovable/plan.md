
## Add Blog Dashboard Link for Admins

This plan adds a "Blog Dashboard" navigation link to the user dropdown menu that only appears for admin users.

### Overview

When an admin user clicks on their avatar in the navbar, they will see an additional "Blog Dashboard" link in the dropdown menu. This link will navigate to `/dashboard/blog`. Regular users will not see this option.

### Changes Required

**File: `src/components/sections/shared/user-menu.tsx`**

1. Import the `useIsAdmin` hook from `@/hooks/use-admin`
2. Import the `LayoutDashboard` icon from `lucide-react` for the menu item
3. Call the `useIsAdmin` hook to check if the current user is an admin
4. Add a conditional "Blog Dashboard" menu item between the Profile link and the separator, visible only when `isAdmin` is `true`

### Technical Details

```text
Current Menu Structure:
+---------------------------+
| Hi, {User}                |
| user@email.com            |
+---------------------------+
| Profile                   |
+---------------------------+
| Sign Out                  |
+---------------------------+

Updated Menu Structure (for admins):
+---------------------------+
| Hi, {User}                |
| user@email.com            |
+---------------------------+
| Profile                   |
| Blog Dashboard  (NEW)     |
+---------------------------+
| Sign Out                  |
+---------------------------+
```

The admin check uses the existing `useIsAdmin` hook which calls the `has_role` database function to verify admin status securely.
