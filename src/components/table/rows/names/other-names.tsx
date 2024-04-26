import ColumnName from "./names";

interface Props {
  name: string;
  rowSpan: number;
}

function DeanRow({ name, rowSpan }: Props) {
  return <ColumnName rowSpan={rowSpan} name={name} title="Dean, COE" />;
}

function ViceChancellorRow({ name, rowSpan }: Props) {
  return <ColumnName rowSpan={rowSpan} name={`${name}, VCAA`} title="" />;
}

export { DeanRow, ViceChancellorRow };
