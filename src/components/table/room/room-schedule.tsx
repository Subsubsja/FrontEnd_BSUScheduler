import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import InputCol from "./input/input-col";
import InputFaculty from "./input/input-faculty";
import ColumnName from "../rows/names/names";
import { DeanRow, ViceChancellorRow } from "../rows/names/other-names";

import useScheduleList from "@/hooks/useScheduleList";
import { useScheduleStore } from "@/stores/schedule";
import { getRoomDataByCode } from "@/services/api/room";
import { SCHEDULES } from "@/constants/initial";
import { ISchedule } from "@/types/api";
import { getFormDetails } from "@/services/api/form";

interface RightValues {
  subject: string;
  section: string;
}

function RoomSchedule() {
  const [state, dispatch, handleInputChange] = useScheduleList();
  const { setSchedules, resetSchedules } = useScheduleStore();
  const [searchParams] = useSearchParams();
  const [uniqueOddValues, setUniqueOddValues] = useState<RightValues[]>();
  const [uniqueEvenValues, setUniqueEvenValues] = useState<RightValues[]>();
  const [deanName, setDeanName] = useState("");
  const [vcaaName, setvcaaName] = useState("");

  useEffect(() => {
    console.log("changed??");

    const id = searchParams.get("id");
    const year = searchParams.get("year");
    const semester = searchParams.get("sem");
    if (!id || !year || !semester) {
      resetSchedules();
      dispatch({ type: "RESET" });
      return;
    }

    const fetchData = async () => {
      const roomDetails = await getRoomDataByCode(id, parseInt(year), semester);
      dispatch({ type: "SET_ALL", value: roomDetails });
    };

    fetchData();
  }, [searchParams]);

  // copy state globally
  useEffect(() => {
    setSchedules(state);
    schedDetailsLazyAlgo(state);
  }, [state]);

  useEffect(() => {
    getFormDetails().then((response) => {
      setDeanName(response.dean);
      setvcaaName(response.vcaa);
    });
  }, []);

  const schedDetailsLazyAlgo = function (state: ISchedule[]) {
    // stackleague big-brain solution
    const formatted: RightValues[] = [];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].schedules.length; j++) {
        const schedule = state[i].schedules[j];
        if (schedule.course === "" || schedule.section === "") continue;

        formatted.push({
          section: schedule.section,
          subject: schedule.course,
        });
      }
    }

    // another big brain move ooohoohohohh~
    const unique: RightValues[] = [];
    for (let i = 0; i < formatted.length; i++) {
      if (
        !unique.find(
          (data) =>
            data.section === formatted[i].section &&
            data.subject === formatted[i].subject,
        )
      )
        unique.push(formatted[i]);
    }

    unique.sort((a: RightValues, b: RightValues) => {
      return a.section.localeCompare(b.section);
    });

    const uniqueOdd: RightValues[] = [];
    const uniqueEven: RightValues[] = [];

    for (let i = 0; i < unique.length; i++) {
      if (i % 2 === 0) uniqueEven.push(unique[i]);
      else uniqueOdd.push(unique[i]);
    }

    setUniqueEvenValues(uniqueEven);
    setUniqueOddValues(uniqueOdd);
  };

  return (
    <>
      {SCHEDULES.map((schedule, index) => (
        <Fragment key={index}>
          {/* template */}
          <tr className="h-8 text-center">
            <td rowSpan={2}>{schedule}</td>

            <InputCol
              stateIndex={index}
              state={state}
              handleInputChange={handleInputChange}
            />

            {index < 20 && (
              <>
                <td>
                  {uniqueEvenValues && index < uniqueEvenValues.length
                    ? uniqueEvenValues[index].subject
                    : ""}
                </td>
                <td>
                  {uniqueEvenValues && index < uniqueEvenValues.length
                    ? uniqueEvenValues[index].section
                    : ""}
                </td>
                <td></td>
              </>
            )}

            {/* Columns for the names in the right side of the table */}
            {index == 20 && (
              <ColumnName rowSpan={4} name="" title="Faculty Assigned" />
            )}

            {index == 22 && <DeanRow name={deanName} rowSpan={4} />}

            {index == 24 && <ViceChancellorRow name={vcaaName} rowSpan={10} />}
          </tr>

          {/* sections */}
          <tr className="h-8 w-fit text-center">
            <InputFaculty
              stateIndex={index}
              state={state}
              handleInputChange={handleInputChange}
              disabled={true}
            />

            {index < 20 && (
              <>
                <>
                  <td>
                    {uniqueOddValues && index < uniqueOddValues.length
                      ? uniqueOddValues[index].subject
                      : ""}
                  </td>
                  <td>
                    {uniqueOddValues && index < uniqueOddValues.length
                      ? uniqueOddValues[index].section
                      : ""}
                  </td>
                  <td></td>
                </>
              </>
            )}
          </tr>
        </Fragment>
      ))}
    </>
  );
}

export default RoomSchedule;
