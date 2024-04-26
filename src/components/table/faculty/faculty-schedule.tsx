/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SCHEDULES } from "@/constants/initial";

import ColumnName from "../rows/names/names";
import { DeanRow, ViceChancellorRow } from "../rows/names/other-names";
import InputCol from "./input/input-col";
import InputSection from "./input/input-section";
import InputScheduleState from "./input/input-schedule-state";

import {
  // getFormattedShedule,
  getScheduleBySemAndYear,
  getScheduleState,
} from "@/services/api/faculty";
import { useScheduleState } from "@/stores/scheduleState";
import { useScheduleStore } from "@/stores/schedule";
import { ISchedule } from "@/types/api";
import useScheduleList from "@/hooks/useScheduleList";
import { useFacultyStore } from "@/stores/faculty";
import { getFormDetails } from "@/services/api/form";

interface RightValues {
  subject: string;
  section: string;
  initials: string;
  status: string;
}

function FacultySchedule() {
  const [state, dispatch, handleInputChange] = useScheduleList();

  const [searchParams] = useSearchParams();

  const { facultyName } = useFacultyStore();
  const { setSchedules, resetSchedules } = useScheduleStore();
  const { scheduleState, setStateSchedule } = useScheduleState();

  const [uniqueOddValues, setUniqueOddValues] = useState<RightValues[]>();
  const [uniqueEvenValues, setUniqueEvenValues] = useState<RightValues[]>();

  const [deanName, setDeanName] = useState("");
  const [vcaaName, setvcaaName] = useState("");

  // fetch data base on userId
  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      const semester = searchParams.get("sem");
      const year = searchParams.get("year");

      console.log(id, semester, year);

      if (!id) {
        resetSchedules();
        dispatch({ type: "RESET" });
        return;
      }

      // const data = await getFormattedShedule(parseInt(id));
      const data = await getScheduleBySemAndYear(
        parseInt(id),
        parseInt(year as string),
        semester as string,
      );

      const schedState = await getScheduleState(data[0].schedules[0].initials);

      dispatch({ type: "SET_ALL", value: data });
      setStateSchedule(schedState.rows);
    };

    fetchData();

    // Reset schedules when going to other page
    return () => {
      resetSchedules();
      dispatch({ type: "RESET" });
    };
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
          initials: schedule.initials,
          status: "",
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

    const cursedOdd: RightValues[] = [];
    for (let i = 0; i < uniqueOdd.length; i++) {
      let matched = false;
      for (let j = 0; j < scheduleState.length; j++) {
        if (
          uniqueOdd[i].initials === scheduleState[j].initials &&
          uniqueOdd[i].section === scheduleState[j].section &&
          uniqueOdd[i].subject === scheduleState[j].course
        ) {
          matched = true;
          cursedOdd.push({
            initials: uniqueOdd[i].initials,
            section: uniqueOdd[i].section,
            subject: uniqueOdd[i].subject,
            status: scheduleState[j].status ?? "",
          });
        }
      }
      if (!matched) cursedOdd.push(uniqueOdd[i]);
    }

    const cursedEven: RightValues[] = [];
    for (let i = 0; i < uniqueEven.length; i++) {
      let matched = false;
      for (let j = 0; j < scheduleState.length; j++) {
        if (
          uniqueEven[i].initials === scheduleState[j].initials &&
          uniqueEven[i].section === scheduleState[j].section &&
          uniqueEven[i].subject === scheduleState[j].course
        ) {
          matched = true;
          cursedEven.push({
            initials: uniqueEven[i].initials,
            section: uniqueEven[i].section,
            subject: uniqueEven[i].subject,
            status: scheduleState[j].status ?? "",
          });
        }
      }
      if (!matched) cursedEven.push(uniqueEven[i]);
    }

    // even has 21 max, and odd has 20
    const slicedEven = cursedEven.splice(0, 21);
    const slicedOdd = cursedOdd.splice(0, 20);

    setUniqueEvenValues(slicedEven);
    setUniqueOddValues(slicedOdd);
  };

  return (
    <>
      {SCHEDULES.map((schedule, index) => {
        return (
          <Fragment key={index}>
            {/* template */}
            <tr className="h-8 text-center">
              <td rowSpan={2}>{schedule}</td>

              <InputCol
                stateIndex={index}
                state={state}
                handleInputChange={handleInputChange}
              />

              {index < 21 && (
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
                  <td>
                    <InputScheduleState
                      course={
                        uniqueEvenValues && index < uniqueEvenValues.length
                          ? uniqueEvenValues[index].subject
                          : ""
                      }
                      initials={
                        uniqueEvenValues && index < uniqueEvenValues.length
                          ? uniqueEvenValues[index].initials
                          : ""
                      }
                      section={
                        uniqueEvenValues && index < uniqueEvenValues.length
                          ? uniqueEvenValues[index].section
                          : ""
                      }
                      status={
                        uniqueEvenValues && index < uniqueEvenValues.length
                          ? uniqueEvenValues[index].status
                          : ""
                      }
                    />
                  </td>
                </>
              )}
            </tr>

            {/* sections */}
            <tr className="h-8 w-fit text-center">
              <InputSection
                stateIndex={index}
                state={state}
                handleInputChange={handleInputChange}
              />

              {index < 20 && (
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
                  <td>
                    <InputScheduleState
                      course={
                        uniqueOddValues && index < uniqueOddValues.length
                          ? uniqueOddValues[index].subject
                          : ""
                      }
                      initials={
                        uniqueOddValues && index < uniqueOddValues.length
                          ? uniqueOddValues[index].initials
                          : ""
                      }
                      section={
                        uniqueOddValues && index < uniqueOddValues.length
                          ? uniqueOddValues[index].section
                          : ""
                      }
                      status={
                        uniqueOddValues && index < uniqueOddValues.length
                          ? uniqueOddValues[index].status
                          : ""
                      }
                    />
                  </td>
                </>
              )}

              {/* Columns for the names in the right side of the table */}
              {index == 20 && (
                <ColumnName
                  rowSpan={4}
                  name={facultyName}
                  title="Faculty Assigned"
                />
              )}

              {index == 22 && <DeanRow name={deanName} rowSpan={6} />}

              {index == 25 && <ViceChancellorRow name={vcaaName} rowSpan={9} />}
            </tr>
          </Fragment>
        );
      })}
    </>
  );
}

export default FacultySchedule;
