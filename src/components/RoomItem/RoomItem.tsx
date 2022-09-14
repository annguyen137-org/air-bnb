import React from "react";
import { Box } from "@mui/material";
import { Room } from "interfaces/room";
import { NavLink } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./RoomItem.module.scss";
interface Props {
  room: Room;
}

const RoomItem = ({ room }: Props) => {
  return (
    <Box className={`${styles["room-card"]}`}>
      <NavLink to={`/rooms/${room._id}`}>
        <Box>
          <Box className={`${styles["room-img"]}`}>
            <img src={`${room.image}`} alt={room.name} />
          </Box>
          <p className={`${styles["room-name"]}`}>{room.name}</p>
          <p className={`${styles["room-price"]}`}>
            <span>${room.price}</span> đêm
          </p>
        </Box>
      </NavLink>
      <FavoriteIcon className={styles["favourite"]} />
    </Box>
  );
};

export default RoomItem;
