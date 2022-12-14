import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomList.module.scss";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoomListByLocation, resetRoomState } from "redux/slices/roomsSlice";
import { RootState, AppDispatch } from "redux/store";
import RoomItem from "components/RoomItem/RoomItem";
import Loading from "components/Loading/Loading";
import { LIMIT } from "services/axiosConfig";
import useIntersectionObserver from "utils/useIntersectionObserver";
import { headerLogoRef } from "components/Header/Header";
import { footerLogoRef } from "components/Footer/Footer";
import { resetFetchAllStatus } from "redux/slices/fetchAllSlice";

const RoomList: React.FC = () => {
  const triggerRef = useRef() as React.MutableRefObject<HTMLElement>;

  const dispatch = useDispatch<AppDispatch>();

  const { isTriggered, page, resetPage, observer } = useIntersectionObserver();

  const { fetchAllLoading } = useSelector((state: RootState) => state.all);

  const { roomsData, roomsPagination, isRoomsLoading } = useSelector(
    (state: RootState) => state.rooms
  );

  const reFetch = () => {
    window.scroll({ top: 0, behavior: "smooth" });

    if (window.top) {
      resetPage();
      dispatch(resetFetchAllStatus());
      dispatch(resetRoomState());
      dispatch(getRoomListByLocation({ limit: LIMIT }));
    }
  };

  // PAGINATION FETCHING DATA USING INTERSECTION OBSERVER (CUSTOM HOOK)
  useEffect(() => {
    headerLogoRef.current?.addEventListener("click", reFetch);

    footerLogoRef.current?.addEventListener("click", reFetch);

    if (triggerRef.current) {
      observer.disconnect();
    }

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
      headerLogoRef.current?.removeEventListener("click", reFetch);
      footerLogoRef.current?.removeEventListener("click", reFetch);
    };
  }, []);

  useEffect(() => {
    if (isTriggered && roomsPagination.length) {
      dispatch(getRoomListByLocation({ limit: LIMIT, skip: LIMIT * page }));
    }
  }, [isTriggered, page]);

  return (
    <Box sx={{ marginTop: "25px" }}>
      <Container>
        <Box className={`${styles["room-list"]}`}>
          {/* show loading at first load */}
          {fetchAllLoading &&
            [...Array(LIMIT)].map((item, index) => (
              <Loading key={index} variant="card" />
            ))}
          {/*  */}
          {roomsData?.map((room) => (
            <RoomItem key={room._id} room={room} />
          ))}
          {/*  */}
          {/* show loading next trigger load */}
          {isRoomsLoading &&
            [...Array(LIMIT)].map((item, index) => (
              <Loading key={index} variant="card" />
            ))}
        </Box>
        <Box
          ref={triggerRef}
          sx={{
            padding: "25px 0",
            textAlign: "center",
          }}
        >
          {!roomsPagination.length ? "End of result" : ""}
        </Box>
      </Container>
    </Box>
  );
};

export default RoomList;
