import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { createFaculty } from "@/services/api/admin";
import * as xslx from "xlsx";
import { useToast } from "@/components/ui/use-toast";

interface JSONFacultyFormat {
  NAME: string;
  INITIALS: string;
}

function UploadFacultyForm() {
  const [excelData, setExcelData] = useState();
  const { toast } = useToast();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();

    if (selectedFile) {
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e: any) => {
        setExcelData(e.target.result);
      };
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (excelData !== null) {
      const workBook = xslx.read(excelData, { type: "buffer" });
      const sheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[sheetName];
      const jsonData: JSONFacultyFormat[] = xslx.utils.sheet_to_json(workSheet);

      let errorCount = 0;
      for (let i = 0; i < jsonData.length; i++) {
        const individual = jsonData[i];
        try {
          await createFaculty(individual.NAME, individual.INITIALS);
        } catch (err) {
          errorCount++;
        }
      }

      if (errorCount > 0)
        return toast({
          variant: "destructive",
          description: "Error occured when uploading faculties",
        });

      toast({
        variant: "success",
        description: "Faculty Excel succesfully loaded!",
      });

      location.reload();
    }
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleFormSubmit}>
      <h1 className="text-lg font-bold">Upload Faculty Form</h1>
      <p>
        If you have excel/csv file for faculty list, kindly select your file and
        upload here
      </p>
      <Input type="file" onChange={handleFile} required />
      <Button type="submit" style={{ backgroundColor: "#1D6F42" }}>
        Upload Excel
      </Button>
    </form>
  );
}

export default UploadFacultyForm;
