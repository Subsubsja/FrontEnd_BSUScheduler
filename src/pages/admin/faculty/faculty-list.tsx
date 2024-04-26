import { Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { getFaculties } from "@/services/api/faculty";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFacultyModalStore from "@/stores/modal/facultyModal";
import { ChangeEvent, useState } from "react";

function FacultyList() {
  const { openModal } = useFacultyModalStore();
  const [nameSearch, setNameSearch] = useState<RegExp>(new RegExp("", "i"));

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameSearch(new RegExp(e.target.value, "i"));
  };

  const { data } = useQuery({
    queryKey: ["faculty-list"],
    queryFn: getFaculties,
  });

  return (
    <>
      <ScrollArea className="h-full w-full">
        <h1 className="text-xl font-bold">Faculty List</h1>

        {/* Bow before my BR */}
        <hr />
        <br />
        <input
          placeholder="Search Faculty..."
          className="block w-full rounded-md border bg-white px-4 py-2 focus:border-red-200 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40"
          onChange={handleOnchange}
        />
        <br />
        <hr />

        <div className="h-full w-full">
          {data &&
            data
              .filter((account) => nameSearch?.test(account.name))
              .map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded p-2 hover:bg-slate-200"
                >
                  <p className="col-span-8 text-lg">{account.name}</p>

                  <section className="flex gap-2">
                    <Button
                      variant={"destructive"}
                      onClick={() => openModal(account, "delete")}
                    >
                      <Trash />
                    </Button>

                    <Button
                      variant={"default"}
                      onClick={() => openModal(account, "update")}
                    >
                      <Edit />
                    </Button>
                  </section>
                </div>
              ))}
        </div>
      </ScrollArea>
    </>
  );
}

export default FacultyList;
