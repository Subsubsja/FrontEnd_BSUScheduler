import { DAYS } from "@/constants/initial";
import { useScheduleStore } from "@/stores/schedule";
import { ISchedule } from "@/types/api";
import { ChangeEvent, Fragment } from "react";

interface Props {
  stateIndex: number;
  state: ISchedule[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

function InputSection({ stateIndex, state, handleInputChange }: Props) {
  const schedulesValue = state[stateIndex].schedules;

  const { schedules } = useScheduleStore();

  return (
    <>
      {DAYS.map((day, index) => (
        <Fragment key={index}>
          <td
            className={
              schedules[stateIndex].schedules[index].conflicted
                ? "bg-red-400"
                : ""
            }
          >
            <input
              type="text"
              name={`${day}-section`}
              value={schedulesValue[index].section}
              onChange={(e) => handleInputChange(e, stateIndex)}
              tabIndex={index}
              disabled={!schedulesValue[index].initials}
            />
          </td>
        </Fragment>
      ))}
    </>
  );
}

export default InputSection;
