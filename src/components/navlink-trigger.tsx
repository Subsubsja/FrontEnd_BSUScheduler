import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { useEditState } from "@/stores/editState";
import { useScheduleStore } from "@/stores/schedule";
import { useFacultyStore } from "@/stores/faculty";
import { useScheduleState } from "@/stores/scheduleState";
import { useToast } from "./ui/use-toast";
import {
  saveFacultyFooter,
  saveScheduleState,
  uploadSchedules,
} from "@/services/api/faculty";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  id?: string | null;
  navtarget: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function NavLinkTrigger({ id, navtarget, open, setOpen }: Props) {
  const { schedules, setSchedules } = useScheduleStore();
  const { scheduleState } = useScheduleState();
  const { total, summary } = useFacultyStore();
  const { setEditState } = useEditState();
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleFacultySave = async () => {
    if (!id) return;
    const response = await uploadSchedules(schedules);
    await saveFacultyFooter(id, total, summary);
    await saveScheduleState(scheduleState);

    console.log(response);

    if (response.conflicts) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There are conflicting schedules.",
        action: <XCircle />,
      });

      setSchedules(response.formattedConflict);
    } else {
      toast({
        variant: "success",
        description: "The schedule has been saved successfully.",
        action: <CheckCircle />,
      });
    }

    setEditState(false);
    setOpen(!open);
    navigate(navtarget);
  };

  const handleCancel = () => {
    setEditState(false);
    navigate(navtarget);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Save Contents</DialogTitle>
        <DialogDescription>
          Do you want to save your changes before navigating other tab?
        </DialogDescription>

        <DialogFooter className="flex">
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="w-1/2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"default"}
            className={"w-1/2"}
            onClick={handleFacultySave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NavLinkTrigger;
