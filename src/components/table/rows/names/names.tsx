interface ColProps {
  rowSpan: number;
  name: string;
  title: string;
}

function ColumnName({ rowSpan, name, title }: ColProps) {
  return (
    <td rowSpan={rowSpan} colSpan={3} className="column-name">
      <br />
      <br />
      <p className="text-[12px]">{name || ""}</p>
      <p className="text-[12px] font-bold">{title || ""}</p>
    </td>
  );
}

export default ColumnName;
