import React, { useEffect, useState } from 'react';
import userService from '../services/users';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const response = userService.getAll();
    setUsers(response);
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th><strong>blogs</strong></th>
          <th><strong>created</strong></th>
        </tr>
        {users.map(user => {
          <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>;
        })}
      </table>
    </div>
  );
};

export default UsersView;