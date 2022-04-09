import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsersThunk } from "../redux/actions";

function UserListContainer() {
  const data = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const getUsers = useCallback(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return <UserList data={data} getUsers={getUsers} />;
}

export default UserListContainer;
