import { IScheduleRight } from "@/types/api";
import { useScheduleState } from "@/stores/scheduleState";
import { useEffect, useState } from "react";

function InputScheduleState({
  course,
  initials,
  section,
  status,
}: IScheduleRight) {
  const { scheduleState, setStateSchedule } = useScheduleState();
  const [value, setValue] = useState(status);

  // checks for duplication
  const handleStore = (params: IScheduleRight) => {
    const { course, initials, section } = params;
    if (course === "" || initials === "" || section === "") return;
    const countsched = scheduleState.filter(
      (sched) =>
        sched.course === course &&
        sched.initials === initials &&
        sched.section === section,
    );

    // append the new sched
    if (countsched.length === 0)
      return setStateSchedule([...scheduleState, params]);

    // replace the old sched
    const newSched = scheduleState.filter(
      (sched) => !(sched.course === course && sched.section === section),
    );

    setStateSchedule([...newSched, params]);
  };

  useEffect(() => {
    setValue(status);
  }, [status]);

  return (
    <input
      tabIndex={-1}
      onChange={(e) => {
        handleStore({ course, initials, section, status: e.target.value });
        setValue(e.target.value);
      }}
      value={value}
    />
  );
}

export default InputScheduleState;
