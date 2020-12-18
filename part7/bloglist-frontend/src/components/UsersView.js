import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const UsersView = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersView;