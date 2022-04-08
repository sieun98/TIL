import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsersFail, getUsersStart, getUsersSuccess } from "../redux/actions";
import axios from "axios";

function UserListContainer() {
  const data = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const start = useCallback(() => {
    dispatch(getUsersStart());
  }, [dispatch]);

  const success = useCallback(
    (data) => {
      dispatch(getUsersSuccess(data));
    },
    [dispatch]
  );

  const fail = useCallback(
    (error) => {
      dispatch(getUsersFail(error));
    },
    [dispatch]
  );

  const getUsers = useCallback(async () => {
    try {
      dispatch(getUsersStart());
      const res = await axios.get("https://api.github.com/users");
      dispatch(getUsersSuccess(res.data));
    } catch (error) {
      dispatch(getUsersFail(error));
    }
  }, [dispatch]);

  return <UserList data={data} getUsers={getUsers} />;
}

export default UserListContainer;
