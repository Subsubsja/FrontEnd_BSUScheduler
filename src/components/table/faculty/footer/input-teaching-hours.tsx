import { ChangeEvent } from "react";

interface Props {
  list: string[];
  handler: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
}

function InputTeachingHours({ list, handler, disabled = false }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const updatedList = list.map((existingValue, i) =>
      i === index ? value : existingValue,
    );
    return handler(updatedList);
  };

  // const total = list
  //   .map((data) => parseFloat(data))
  //   .reduce((acc, current) => acc + current);

  return (
    <tr className="text-sm">
      <td>No. of Teaching Hours</td>

      {list.map((_item, index) => (
        <td key={index} colSpan={2}>
          {index <= 6 && (
            <input
              type="number"
              min={0}
              value={list[index]}
              onChange={(e) => handleChange(e, index)}
              disabled={disabled}
            />
          )}

          {/* {index == 5 && <p className="text-end font-bold">TOTAL</p>} */}

          {/* {index == 6 && (
            <p className="text-center font-bold">
              {total ? `${total} hours` : ""}
            </p>
          )} */}
        </td>
      ))}
    </tr>
  );
}

export default InputTeachingHours;
