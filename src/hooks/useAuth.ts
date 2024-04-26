/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@/lib/cookie";

type Permission = "admin" | "user" | null;

function useAuth() {
  const [permission, setPermission] = useState<Permission>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    const permission = getCookie("permission") as Permission;

    setPermission(permission);

    if (!token || !permission) {
      setPermission(null);
      navigate("/login", { replace: true });
    }
  }, []);

  return permission;
}

export default useAuth;
