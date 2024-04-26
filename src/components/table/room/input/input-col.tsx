import { ChangeEvent, Fragment } from "react";
import { ISchedule } from "@/types/api";
import { DAYS } from "@/constants/initial";

interface Props {
  stateIndex: number;
  state: ISchedule[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

function InputCol({ stateIndex, state, handleInputChange }: Props) {
  return (
    <>
      {DAYS.map((day, index) => (
        <Fragment key={index}>
          {/*  */}
          <td rowSpan={1}>
            <input
              disabled
              type="text"
              name={`${day}-course`}
              value={state[stateIndex].schedules[index].course}
              onChange={(e) => handleInputChange(e, stateIndex)}
              tabIndex={index}
            />
          </td>

          {/* The big field */}
          <td rowSpan={2}>
            <input
              disabled
              type="text"
              name={`${day}-section`}
              value={state[stateIndex].schedules[index].section}
              onChange={(e) => handleInputChange(e, stateIndex)}
              tabIndex={index}
            />
          </td>
        </Fragment>
      ))}
    </>
  );
}

export default InputCol;
