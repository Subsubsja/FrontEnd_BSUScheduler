import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/App";

import { createAccount } from "@/services/api/admin";
import { useToast } from "@/components/ui/use-toast";

function AccountForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => createAccount(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
      setUsername("");
      setPassword("");

      toast({
        description: "Account created successfully",
        variant: "success",
      });
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    mutation.mutate();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-2">
      <h1 className="text-lg font-bold">Account Form</h1>

      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button>Add Account</Button>
    </form>
  );
}

export default AccountForm;
