import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createFaculty } from "@/services/api/admin";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

function FacultyForm() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => createFaculty(name, initials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-list"] });
      toast({
        variant: "success",
        description: "Faculty added.",
      });

      setName("");
      setInitials("");
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !initials) return;

    mutation.mutate();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-2">
      <h1 className="text-lg font-bold">Faculty Form</h1>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="faculty name"
      />
      <Input
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        placeholder="initials"
      />
      <Button>Add faculty</Button>
    </form>
  );
}

export default FacultyForm;
