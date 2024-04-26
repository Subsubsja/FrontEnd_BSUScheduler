import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useFacultyStore } from "@/stores/faculty";
import { useScheduleStore } from "@/stores/schedule";
import { useScheduleState } from "@/stores/scheduleState";

import { updateClassSectionSchedule } from "@/services/api/schedule";
import {
  saveFacultyFooter,
  saveScheduleState,
  uploadSchedules,
} from "@/services/api/faculty";
import { useEditState } from "@/stores/editState";

function ButtonSave() {
  const [isSaving, setIsSaving] = useState(false);

  const { schedules, setSchedules } = useScheduleStore();
  const { scheduleState } = useScheduleState();
  const { total, summary } = useFacultyStore();
  const { setEditState } = useEditState();

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const { toast } = useToast();

  const handleFacultySave = async () => {
    setIsSaving(true);

    const id = searchParams.get("id");
    const semester = searchParams.get("sem");
    const acadyear = searchParams.get("year");

    // requires the year and semester
    if (!id || !semester || !acadyear) return;

    const response = await uploadSchedules(
      schedules,
      semester,
      parseInt(acadyear),
    );

    await saveFacultyFooter(id, total, summary);
    await saveScheduleState(scheduleState);

    if (response.conflicts) {
      let errorMessage = "There are conflicting schedules.";
      switch (response.conflicts[0].type) {
        case "online-conflict":
          errorMessage =
            "There are conflicting schedules in added online schedule";
          break;
        case "ftf-conflict":
          errorMessage =
            "There are conflicting schedules in added face-to-face schedule";
          break;
        case "room-conflict":
          errorMessage = "There are conflicting schedules in room utilization.";
          break;
        case "section-conflict":
          errorMessage = "There are conflicting schedules in class schedules.";
          break;
        default:
          errorMessage = "There are conflicting schedules.";
          break;
      }

      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: errorMessage,
        action: <XCircle />,
      });

      // manually search through conflicts
      for (let ci = 0; ci < response.conflicts.length; ci++) {
        const conflict = response.conflicts[ci];
        const conflictTime = conflict["schedule"]["time"];
        const conflictDay = conflict["schedule"]["day"];

        setSchedules(
          schedules.map((sched) => {
            if (sched.time === conflictTime) {
              const schedules = sched.schedules.map((day) => {
                if (day.day === conflictDay) day.conflicted = true;
                return day;
              });
              const time = sched.time;
              return { schedules, time };
            }

            return sched;
          }),
        );
      }
    } else {
      toast({
        variant: "success",
        description: "The schedule has been saved successfully.",
        action: <CheckCircle />,
      });
    }

    setIsSaving(false);
    setEditState(false);
  };

  const handleSectionScheduleSave = async () => {
    setIsSaving(true);
    try {
      await updateClassSectionSchedule({ rows: schedules });
      toast({
        variant: "success",
        description: "The schedule has been saved successfully.",
        action: <CheckCircle />,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There are conflicting schedules.",
        action: <XCircle />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      variant={"secondary"}
      onClick={pathname == "/" ? handleFacultySave : handleSectionScheduleSave}
      disabled={isSaving || pathname === "/schedules" || pathname == "/rooms"}
      className="w-24"
    >
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
}

export default ButtonSave;
