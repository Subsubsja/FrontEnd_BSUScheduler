/**
 * Due to time constraints, the developer tried to
 * implement this feature with no optimization in mind,
 * Im sorry for those who are reading this mess.
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandEmpty, CommandInput } from "cmdk";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { getFaculties } from "@/services/api/faculty";
import { useScheduleStore } from "@/stores/schedule";
import { IFaculty } from "@/types/api";
import { cn } from "@/lib/utils";
import { useFacultyStore } from "@/stores/faculty";

function SelectFaculty() {
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { setFacultyName, resetAll } = useFacultyStore();
  const [selectedId, setSelectedId] = useState<string | null>(
    searchParams.get("id"),
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { resetSchedules } = useScheduleStore();

  // fetch faculty list
  useEffect(() => {
    const fetchData = async () => {
      const faculties = await getFaculties();

      setFaculties(faculties);

      const facultyName =
        faculties.find((faculty) => faculty.id.toString() === selectedId)
          ?.name || "";

      setValue(facultyName);
      setFacultyName(facultyName);
    };

    fetchData();
  }, []);

  // Update query params on select
  useEffect(() => {
    if (!selectedId) {
      setValue("");
      searchParams.delete("id");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("id", selectedId.toString());
    setSearchParams(searchParams);
  }, [value]);

  // reset all details if params is invalid
  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) {
      setSelectedId(null);
      setValue("");
      resetSchedules();
      resetAll();
      searchParams.delete("id");
      setSearchParams(searchParams);
    }

    const facultyName =
      faculties.find((faculty) => faculty.id.toString() === selectedId)?.name ||
      "";

    setFacultyName(facultyName);
  }, [searchParams]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[225px] justify-between"
          id="faculty-select"
        >
          {value
            ? faculties.find(
                (faculty) => faculty.name.toLowerCase() === value.toLowerCase(),
              )?.name
            : "Select faculty..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[225px] p-0">
        <Command>
          <CommandInput
            placeholder="Search faculty..."
            className="search h-9 p-2 text-start"
          />
          <CommandEmpty>No faculty found.</CommandEmpty>
          <CommandGroup>
            {faculties.map((faculty) => (
              <CommandItem
                key={faculty.id}
                value={faculty.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setSelectedId(
                    faculty.id.toString() === selectedId
                      ? null
                      : faculty.id.toString(),
                  );
                  setOpen(false);
                }}
              >
                {faculty.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value.toLowerCase() === faculty.name.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectFaculty;
