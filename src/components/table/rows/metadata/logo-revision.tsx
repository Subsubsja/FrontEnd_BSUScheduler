interface Props {
  refNumber: string;
  effectivityDate: string;
  revisionNumber: string;
}

function LogoRevision({ refNumber, effectivityDate, revisionNumber }: Props) {
  return (
    <tr className="h-16">
      <td colSpan={1} className="h-16 w-[100px]">
        <img src="/university-logo.png" className="m-auto h-full" />
      </td>
      <td colSpan={7}>Reference No.: BatStateU-REC-COL-{refNumber}</td>
      <td colSpan={7}> Effectivity Date: {effectivityDate}</td>
      <td colSpan={6}> Revision No.: {revisionNumber}</td>
    </tr>
  );
}

export default LogoRevision;
