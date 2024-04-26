import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/modal/custom-modal";

import useFacultyModalStore from "@/stores/modal/facultyModal";

import { queryClient } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import { deleteFaculty, updateFaculty } from "@/services/api/faculty";
import { useMutation } from "@tanstack/react-query";

function UpdateModal() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [id, setId] = useState(0);

  const { isOpen, action, faculty, closeModal } = useFacultyModalStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!faculty) return;
    setName(faculty.name);
    setInitials(faculty.initials);
    setId(faculty.id);
  }, [faculty]);

  const updateMutation = useMutation({
    mutationFn: () => updateFaculty(id, name, initials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-list"] });
      closeModal();
      toast({
        description: "Faculty details updated",
        variant: "success",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaculty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-list"] });
      closeModal();
      toast({
        description: "Faculty successfully deleted.",
      });
    },
  });

  const title =
    action === "update" ? "Update faculty information" : "Delete faculty";

  // This function will either execute the mutatiion handler for edit or update
  const callback = () => {
    if (!faculty) return;

    if (action === "delete") {
      deleteMutation.mutate(faculty.initials);
    } else {
      updateMutation.mutate();
    }
  };

  return (
    <CustomModal
      action={action}
      callback={callback}
      isOpen={isOpen}
      closeModal={closeModal}
      title={title}
      content={
        action === "update" ? (
          <>
            <Input
              placeholder="Faculty name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Initials"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
            />
          </>
        ) : (
          `Are you sure you want to remove ${faculty?.name}?`
        )
      }
    />
  );
}

export default UpdateModal;
