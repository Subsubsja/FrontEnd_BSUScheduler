import AdminHome from "@/pages/admin";
import AccountsPage from "@/pages/admin/accounts";
import FacultyPage from "@/pages/admin/faculty";
import FormSettingsPage from "@/pages/admin/form-settings";

export const adminRoutes = [
  { index: true, element: <AdminHome /> },
  { path: "form-details", element: <FormSettingsPage /> },
  { path: "accounts", element: <AccountsPage /> },
  { path: "faculties", element: <FacultyPage /> },
];
