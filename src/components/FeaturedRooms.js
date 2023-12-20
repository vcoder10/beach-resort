import React from "react";
import Title from "./Title";
import Room from "./Room";
import Loading from "./Loading";
import { useRoomContext } from "../context";

const FeaturedRooms = () => {
  const { loading, featuredRooms: rooms } = useRoomContext();

  const roomItems = rooms.map((room) => <Room key={room.id} room={room} />);

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : roomItems}
      </div>
    </section>
  );
};

export default FeaturedRooms;

// import React, { Component } from "react";
// import Title from "./Title";
// //import { RoomContext } from "../context";
// import Room from "./Room";
// import Loading from "./Loading";
// import { useRoomContext } from '../context';
// export default class FeaturedRooms extends Component {
//   static contextType = RoomContext;

//   render() {
//     let { loading, featuredRooms: rooms } = this.context;

//     rooms = rooms.map((room) => {
//       return <Room key={room.id} room={room} />;
//     });
//     return (
//       <section className="featured-rooms">
//         <Title title="featured rooms" />
//         <div className="featured-rooms-center">
//           {loading ? <Loading /> : rooms}
//         </div>
//       </section>
//     );
//   }
// }
