import React from "react";
// import { withRoomConsumer } from "../context";
import { useRoomContext } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomContainer() {
  const { loading, sortedRooms, rooms } = useRoomContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default RoomContainer;
