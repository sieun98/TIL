import React, { useEffect } from "react";

function UserList({ data, getUsers }) {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (data.length === 0) {
    return <p>현재 유저 정보 없음.</p>;
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  );
}

export default UserList;
