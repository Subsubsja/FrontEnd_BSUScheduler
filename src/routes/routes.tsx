import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "@/layouts/admin-layout";
import UserLayout from "@/layouts/user-layout";
import LoginPage from "@/pages/login";

import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "/",
    element: <UserLayout />,
    children: userRoutes,
  },
]);
