import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header/header";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function UserLayout() {
  const permission = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (permission === "admin") {
      navigate("/admin");
    }
  });

  if (permission !== "user") return;

  return (
    <div className="flex h-screen min-h-screen flex-col">
      <Header />

      <main className="container flex-1 py-2">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
