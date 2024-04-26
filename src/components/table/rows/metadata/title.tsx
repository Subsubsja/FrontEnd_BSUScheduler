interface TableTitleProps {
  title: string;
}

function TableTitle({ title }: TableTitleProps) {
  return (
    <tr className="h-10">
      <td colSpan={19} className="w-full text-center font-bold uppercase">
        {title}
      </td>
    </tr>
  );
}

export default TableTitle;
