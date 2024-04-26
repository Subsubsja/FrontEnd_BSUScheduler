import "./table.scss";

interface MainTableProps {
  children: React.ReactNode;
}

function MainTable({ children }: MainTableProps) {
  return (
    <table id="table-schedule" className="h-full w-full">
      <tbody>{children}</tbody>
    </table>
  );
}

export default MainTable;
