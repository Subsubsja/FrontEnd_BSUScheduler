import DayList from "./day-column";

interface Props {
  category: string;
}

function ScheduleHeader({ category }: Props) {
  return (
    <tr className="h-12 text-center text-xs font-bold uppercase">
      <td className="w-[150px]">time</td>
      <DayList category={category} />

      <td>{category === "room" ? "COURSE CODE" : "SUBJECT"}</td>
      <td>{category === "RM" ? "INSTRUCTOR" : "section"}</td>
      <td className="w-[11px]">NO. OF STUDENTS</td>
    </tr>
  );
}

export default ScheduleHeader;
