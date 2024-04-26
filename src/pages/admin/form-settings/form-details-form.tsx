import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { getFormDetails, updateFormDetails } from "@/services/api/form";
import { IFormDetails } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

function FormDetails() {
  const [academicYear, setAcademicYear] = useState("2024");
  const [semester, setSemester] = useState("SECOND");
  const [vcaa, setVcaa] = useState("");
  const [dean, setDean] = useState("");
  const [isLoad, setIsLoad] = useState(true);

  const { toast } = useToast();

  const loadMutation = useMutation({
    mutationFn: () => getFormDetails(),
    onSuccess: (data: IFormDetails) => {
      setAcademicYear(data.academic_year);
      setSemester(data.semester);
      setVcaa(data.vcaa);
      setDean(data.dean);
      setIsLoad(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateFormDetails({
        academic_year: academicYear,
        dean,
        semester,
        vcaa,
      }),
    onSuccess: () => {
      toast({
        description: "Form Details Updated successfully!",
        variant: "success",
      });
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (academicYear === "" || semester === "" || vcaa === "" || dean === "")
      return;
    isLoad ? loadMutation.mutate() : updateMutation.mutate();
  };

  useEffect(() => {
    getFormDetails().then((response) => {
      setAcademicYear(response.academic_year);
      setSemester(response.semester);
      setVcaa(response.vcaa);
      setDean(response.dean);
    });
  }, []);

  return (
    <form
      className="flex w-full flex-col gap-2"
      style={{ marginBottom: "2em" }}
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-lg font-bold">Form Details</h1>
      <Input
        placeholder="Academic Year"
        value={!isLoad ? academicYear : ""}
        onChange={(e) => setAcademicYear(e.target.value)}
      />
      <Input
        placeholder="Semester"
        value={!isLoad ? semester : ""}
        onChange={(e) => setSemester(e.target.value)}
      />
      <Input
        placeholder="VCAA"
        value={!isLoad ? vcaa : ""}
        onChange={(e) => setVcaa(e.target.value)}
      />
      <Input
        placeholder="Dean"
        value={!isLoad ? dean : ""}
        onChange={(e) => setDean(e.target.value)}
      />
      <Button>{isLoad ? "Load" : "Update"}</Button>
    </form>
  );
}

export default FormDetails;
