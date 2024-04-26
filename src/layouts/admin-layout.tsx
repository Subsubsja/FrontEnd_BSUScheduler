import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonLogout from "../components/button-logout";
import useAuth from "@/hooks/useAuth";

function AdminLayout() {
  const permission = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (permission === "user") {
      navigate("/");
    }
  });

  if (permission !== "admin") return;

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-black/80 p-2">
        <div className="container flex items-center justify-between">
          <h1
            className="cursor-pointer select-none text-2xl font-bold text-white"
            onClick={() => navigate("/admin")}
          >
            DASH SCHEDULER
          </h1>
          <ButtonLogout />
        </div>
      </header>

      <main className="container h-full overflow-hidden py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
