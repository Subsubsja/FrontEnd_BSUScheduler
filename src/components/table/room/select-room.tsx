import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRoomList } from "@/services/api/room";

function SelectRoom() {
  const [rooms, setRooms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(
    searchParams.get("id") || "",
  );

  useEffect(() => {
    const fetchData = async () => {
      const roomList = await getRoomList();
      setRooms(roomList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) {
      setSelectedValue("");
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year: string = searchParams.get("year") ?? "";
    const sem: string = searchParams.get("sem") ?? "";

    setSelectedValue(e.target.value);
    setSearchParams({ year, sem, id: e.target.value });
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="rounded p-1"
    >
      <option value="" disabled>
        Select Room
      </option>

      {rooms &&
        rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
    </select>
  );
}

export default SelectRoom;
