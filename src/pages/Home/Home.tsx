import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, resetFetchAllStatus } from "redux/slices/fetchAllSlice";
import { resetLocationState } from "redux/slices/locationsSlice";
import { resetRoomState } from "redux/slices/roomsSlice";
import { AppDispatch, RootState } from "redux/store";
import initFetch from "utils/initFetch";
import { clearLocalStorage } from "utils/storage";
import useIsFirstLoad from "utils/useIsFirstLoad";
import Banner from "./Banner/Banner";

import RoomList from "./RoomList/RoomList";

const Home = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  const [isFirstLoad, setIsFirstLoad] = useIsFirstLoad();

  useEffect(() => {
    window.scroll(0, 0);
    if (isFirstLoad) {
      setIsFirstLoad(false);
      dispatch(fetchAll(initFetch(user, "home")));
    }

    return () => {
      // CLEANUP STATE WHEN COMPONENT UNMOUNT, FOR REFETCHING NEWEST DATA FROM BACKEND API IF COMPONENT IS MOUNT NEXT TIME
      dispatch(resetFetchAllStatus());
      dispatch(resetRoomState());
      dispatch(resetLocationState());
    };
  }, []);

  return (
    <>
      <Banner />
      <RoomList />
    </>
  );
};

export default Home;
