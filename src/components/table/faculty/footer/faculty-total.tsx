/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import InputFields from "./input-fields";
import InputTeachingHours from "./input-teaching-hours";

import { useScheduleStore } from "@/stores/schedule";
import { initialValues, useFacultyStore } from "@/stores/faculty";
import { getFacultyFooter } from "@/services/api/faculty";
import { calculateHoursByDay } from "@/lib/calculateHours";

function FacultyTotal() {
  const [officialTime, setOfficialTime] = useState(initialValues);
  const [hours, setHours] = useState(initialValues);
  const [overtimeWithin, setOvertimeWithin] = useState(initialValues);
  const [overtimeOutside, setOvertimeOutside] = useState(initialValues);

  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState(searchParams.get("userId") || "");

  const { schedules } = useScheduleStore();
  const { setTotal } = useFacultyStore();

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      setUserId(id || "");

      // Reset values
      if (!id) {
        setOfficialTime(initialValues);
        setHours(initialValues);
        setOvertimeWithin(initialValues);
        setOvertimeOutside(initialValues);
        return;
      }

      const { total } = await getFacultyFooter(id);

      const { officialTime, teachingHours, overtimeOutside, overtimeWithin } =
        total;

      setOfficialTime(officialTime);
      setHours(teachingHours);
      setOvertimeWithin(overtimeWithin);
      setOvertimeOutside(overtimeOutside);
    };

    fetchData();
  }, [searchParams]);

  // Copy to global state
  useEffect(() => {
    setTotal({
      officialTime,
      teachingHours: hours,
      overtimeWithin,
      overtimeOutside,
    });
  }, [officialTime, hours, overtimeWithin, overtimeOutside]);

  useEffect(() => {
    if (!searchParams.get("id")) return;

    const totalHours = calculateHoursByDay(schedules);
    const parsed = totalHours.map((hour) => hour.toString());

    setHours(parsed);
  }, [schedules]);

  return (
    <>
      <InputFields
        title="Official Time"
        list={officialTime}
        handler={setOfficialTime}
        disabled={!userId}
      />

      <InputTeachingHours list={hours} handler={setHours} disabled={!userId} />

      <InputFields
        title="Overtime Within"
        list={overtimeWithin}
        handler={setOvertimeWithin}
        disabled={!userId}
      />

      <InputFields
        title="Overtime Outside"
        list={overtimeOutside}
        handler={setOvertimeOutside}
        disabled={!userId}
      />
    </>
  );
}

export default FacultyTotal;
