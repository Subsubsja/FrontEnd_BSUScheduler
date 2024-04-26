import { ChangeEvent, Fragment } from "react";
import { ISchedule } from "@/types/api";
import { DAYS } from "@/constants/initial";

interface Props {
  stateIndex: number;
  state: ISchedule[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  disabled?: boolean;
}

function InputFaculty({
  stateIndex,
  state,
  handleInputChange,
  disabled = false,
}: Props) {
  return (
    <>
      {DAYS.map((day, index) => (
        <Fragment key={index}>
          <td>
            <input
              type="text"
              name={`${day}-initials`}
              value={state[stateIndex].schedules[index].initials}
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

export default InputFaculty;
