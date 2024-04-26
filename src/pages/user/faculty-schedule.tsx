import MainTable from "@/components/table/root";
import LogoRevision from "@/components/table/rows/metadata/logo-revision";
import TableTitle from "@/components/table/rows/metadata/title";
import CollegeInfo from "@/components/table/rows/metadata/college-info";
import ScheduleInfo from "@/components/table/rows/metadata/schedule-info";
import ScheduleHeader from "@/components/table/rows/schedule-header";
import SelectFaculty from "@/components/table/faculty/select-faculty";
import FacultySchedule from "@/components/table/faculty/faculty-schedule";
import FacultySummary from "@/components/table/faculty/footer/faculty-summary";
import FacultyTotal from "@/components/table/faculty/footer/faculty-total";
import useKey from "@/hooks/useKey";
import { useSearchParams } from "react-router-dom";
import {
  saveFacultyFooter,
  saveScheduleState,
  uploadSchedules,
} from "@/services/api/faculty";
import { useScheduleStore } from "@/stores/schedule";
import { useFacultyStore } from "@/stores/faculty";
import { useScheduleState } from "@/stores/scheduleState";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

function FacultySchedulePage() {
  const [searchParams] = useSearchParams();
  const { schedules, setSchedules } = useScheduleStore();
  const { total, summary } = useFacultyStore();
  const { scheduleState } = useScheduleState();
  const { toast } = useToast();

  useKey("ctrls", async () => {
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
  });

  return (
    <div>
      <MainTable>
        <LogoRevision
          refNumber="01"
          effectivityDate="January 3, 2017"
          revisionNumber="00"
        />

        {/* Table Info */}
        <TableTitle title="faculty schedule" />
        <CollegeInfo />
        <ScheduleInfo category="Name of faculty" dropdown={<SelectFaculty />} />

        <ScheduleHeader category="room" />
        <FacultySchedule />
        <FacultyTotal />
        <FacultySummary />
      </MainTable>
    </div>
  );
}
export default FacultySchedulePage;
