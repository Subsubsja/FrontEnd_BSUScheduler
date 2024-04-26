import { ChangeEvent, Fragment } from "react";
import TextAreaAutoSize from "react-textarea-autosize";

import { DAYS } from "@/constants/initial";
import { ISchedule } from "@/types/api";

interface Props {
  stateIndex: number;
  state: ISchedule[];
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => void;
  disabled: boolean;
}

function InputCol({ stateIndex, state, handleInputChange, disabled }: Props) {
  return (
    <>
      {DAYS.map((day, index) => (
        <Fragment key={index}>
          {/*  */}
          <td rowSpan={1}>
            <input
              type="text"
              name={`${day}-course`}
              value={state[stateIndex].schedules[index].course}
              onChange={(e) => handleInputChange(e, stateIndex)}
              tabIndex={index}
              disabled={disabled}
            />
          </td>

          {/*  */}
          <td rowSpan={2}>
            <TextAreaAutoSize
              className="h-full w-full resize-none text-center"
              minRows={2}
              name={`${day}-room`}
              value={state[stateIndex].schedules[index].room}
              onChange={(e) => handleInputChange(e, stateIndex)}
              tabIndex={index}
              disabled={disabled}
            />
          </td>
        </Fragment>
      ))}
    </>
  );
}

export default InputCol;
