import React, { useState, useEffect, createContext, useContext } from "react";
import items from "./data";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    const getData = async () => {
      let roomsData = formatData(items);
      let featuredRoomsData = roomsData.filter(
        (room) => room.featured === true
      );
      let maxPrice = Math.max(...roomsData.map((item) => item.price));
      let maxSize = Math.max(...roomsData.map((item) => item.size));

      setState((prevState) => ({
        ...prevState,
        rooms: roomsData,
        featuredRooms: featuredRoomsData,
        sortedRooms: roomsData,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      }));
    };

    getData();
  }, []);

  const formatData = (items) => {
    return items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
  };

  const getRoom = (slug) => {
    let tempRooms = [...state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    filterRooms(); // Call filterRooms after state changes
  };

  const filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      state;
    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter((room) => room.price <= price);

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setState((prevState) => ({
      ...prevState,
      sortedRooms: tempRooms,
    }));
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        getRoom,
        handleChange,
        filterRooms,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomContext);
};

// import React, { useState, useEffect, createContext, useContext } from "react";
// import items from "./data";

// const RoomContext = createContext();

// export const RoomProvider = ({ children }) => {
//   const [state, setState] = useState({
//     rooms: [],
//     sortedRooms: [],
//     featuredRooms: [],
//     loading: true,
//     type: "all",
//     capacity: 1,
//     price: 0,
//     minPrice: 0,
//     maxPrice: 0,
//     minSize: 0,
//     maxSize: 0,
//     breakfast: false,
//     pets: false,
//   });

//   useEffect(() => {
//     const getData = async () => {
//       // Fetch data or perform any asynchronous operations
//       let roomsData = formatData(items);
//       let featuredRoomsData = roomsData.filter(
//         (room) => room.featured === true
//       );
//       let maxPrice = Math.max(...roomsData.map((item) => item.price));
//       let maxSize = Math.max(...roomsData.map((item) => item.size));

//       setState((prevState) => ({
//         ...prevState,
//         rooms: roomsData,
//         featuredRooms: featuredRoomsData,
//         sortedRooms: roomsData,
//         loading: false,
//         price: maxPrice,
//         maxPrice,
//         maxSize,
//       }));
//     };

//     getData();
//   }, []);

//   const formatData = (items) => {
//     return items.map((item) => {
//       let id = item.sys.id;
//       let images = item.fields.images.map((image) => image.fields.file.url);
//       let room = { ...item.fields, images, id };
//       return room;
//     });
//   };

//   const getRoom = (slug) => {
//     let tempRooms = [...state.rooms];
//     const room = tempRooms.find((room) => room.slug === slug);
//     return room;
//   };

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;

//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const filterRooms = () => {
//     let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
//       state;
//     let tempRooms = [...rooms];

//     capacity = parseInt(capacity);
//     price = parseInt(price);

//     if (type !== "all") {
//       tempRooms = tempRooms.filter((room) => room.type === type);
//     }

//     if (capacity !== 1) {
//       tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
//     }

//     tempRooms = tempRooms.filter((room) => room.price <= price);

//     tempRooms = tempRooms.filter(
//       (room) => room.size >= minSize && room.size <= maxSize
//     );

//     if (breakfast) {
//       tempRooms = tempRooms.filter((room) => room.breakfast === true);
//     }

//     if (pets) {
//       tempRooms = tempRooms.filter((room) => room.pets === true);
//     }

//     setState((prevState) => ({
//       ...prevState,
//       sortedRooms: tempRooms,
//     }));
//   };

//   return (
//     <RoomContext.Provider
//       value={{
//         ...state,
//         getRoom,
//         handleChange,
//       }}
//     >
//       {children}
//     </RoomContext.Provider>
//   );
// };

// export const useRoomContext = () => {
//   return useContext(RoomContext);
// };

// RoomConsumer and withRoomConsumer are not needed with the functional approach

// import React, { Component } from "react";
// import items from "./data";

// const RoomContext = React.createContext();

// export default class RoomProvider extends Component {
//   state = {
//     rooms: [],
//     sortedRooms: [],
//     featuredRooms: [],
//     loading: true,
//     //
//     type: "all",
//     capacity: 1,
//     price: 0,
//     minPrice: 0,
//     maxPrice: 0,
//     minSize: 0,
//     maxSize: 0,
//     breakfast: false,
//     pets: false,
//   };

//   componentDidMount() {
//     // this.getData();
//     let rooms = this.formatData(items);
//     let featuredRooms = rooms.filter((room) => room.featured === true);
//     //
//     let maxPrice = Math.max(...rooms.map((item) => item.price));
//     let maxSize = Math.max(...rooms.map((item) => item.size));
//     this.setState({
//       rooms,
//       featuredRooms,
//       sortedRooms: rooms,
//       loading: false,
//       //
//       price: maxPrice,
//       maxPrice,
//       maxSize,
//     });
//   }

//   formatData(items) {
//     let tempItems = items.map((item) => {
//       let id = item.sys.id;
//       let images = item.fields.images.map((image) => image.fields.file.url);

//       let room = { ...item.fields, images, id };
//       return room;
//     });
//     return tempItems;
//   }
//   getRoom = (slug) => {
//     let tempRooms = [...this.state.rooms];
//     const room = tempRooms.find((room) => room.slug === slug);
//     return room;
//   };
//   handleChange = (event) => {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     console.log(name, value);

//     this.setState(
//       {
//         [name]: value,
//       },
//       this.filterRooms
//     );
//   };
//   filterRooms = () => {
//     let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
//       this.state;

//     let tempRooms = [...rooms];
//     // transform values
//     // get capacity
//     capacity = parseInt(capacity);
//     price = parseInt(price);
//     // filter by type
//     if (type !== "all") {
//       tempRooms = tempRooms.filter((room) => room.type === type);
//     }
//     // filter by capacity
//     if (capacity !== 1) {
//       tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
//     }
//     // filter by price
//     tempRooms = tempRooms.filter((room) => room.price <= price);
//     //filter by size
//     tempRooms = tempRooms.filter(
//       (room) => room.size >= minSize && room.size <= maxSize
//     );
//     //filter by breakfast
//     if (breakfast) {
//       tempRooms = tempRooms.filter((room) => room.breakfast === true);
//     }
//     //filter by pets
//     if (pets) {
//       tempRooms = tempRooms.filter((room) => room.pets === true);
//     }
//     this.setState({
//       sortedRooms: tempRooms,
//     });
//   };
//   render() {
//     return (
//       <RoomContext.Provider
//         value={{
//           ...this.state,
//           getRoom: this.getRoom,
//           handleChange: this.handleChange,
//         }}
//       >
//         {this.props.children}
//       </RoomContext.Provider>
//     );
//   }
// }
// const RoomConsumer = RoomContext.Consumer;

// export { RoomProvider, RoomConsumer, RoomContext };

// export function withRoomConsumer(Component) {
//   return function ConsumerWrapper(props) {
//     return (
//       <RoomConsumer>
//         {(value) => <Component {...props} context={value} />}
//       </RoomConsumer>
//     );
//   };
// }
