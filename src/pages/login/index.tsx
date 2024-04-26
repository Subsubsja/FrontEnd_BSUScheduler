/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { loginAccount } from "@/services/auth";
import { setCookie } from "@/lib/cookie";
import useAuth from "@/hooks/useAuth";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const permission = useAuth();

  // Remove error messages on input
  useEffect(() => {
    if (error) setError("");
  }, [username, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Submit to backend
    const response = await loginAccount(username, password);

    if (!response.token) {
      setError(response);
      return;
    }

    const { token, permission } = response;

    // set browser cookies
    setCookie("token", token);
    setCookie("permission", permission);

    // go to respective page based on permission
    const path = permission === "admin" ? "/admin" : "/"; // or admin
    navigate(path, { replace: true });
  };

  if (permission) return;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-tr from-sky-400 to-indigo-800">
      <main className="flex h-fit   w-full flex-col gap-4 bg-white p-4 drop-shadow-2xl sm:w-[400px] sm:rounded-xl">
        <div className="flex h-32 items-center justify-center">
          <img src="/logo.png" />
        </div>

        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="flex w-full flex-col gap-2"
        >
          <label className="font-bold" htmlFor="username">
            Username
          </label>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>

        {error && <p className="text-center text-xs text-red-400">*{error}*</p>}

        <Button
          type="submit"
          form="login-form"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Login
        </Button>
      </main>
    </div>
  );
}

export default LoginPage;
