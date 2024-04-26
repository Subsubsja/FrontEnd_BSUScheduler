import { Fragment } from "react";
import { DAYS } from "@/constants/initial";

interface Props {
  category: string;
}

function DayList({ category }: Props) {
  return (
    <>
      {DAYS.map((day, index) => (
        <Fragment key={index}>
          <td className="w-24">{day}</td>
          <td className="w-24">{category}</td>
        </Fragment>
      ))}
    </>
  );
}

export default DayList;
