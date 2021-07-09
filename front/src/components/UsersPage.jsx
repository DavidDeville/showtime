import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";
import "../style/style.css";
import { useHistory } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const {isAdmin, setIsAdmin } = useContext(AuthContext);

  /**
   * API call to fetch the concerts
   */
  const fetchUsers = async () => {
    try {
      const data = await api.get("users");
      console.log(data);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle concert delete feature
   */
  const handleDelete = async (id) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user._id !== id));
    console.log(id);
    try {
      const data = await api.deleter("users/" +id)
    } catch (error) {
      console.log(error);
      setUsers(originalUsers);
    }
  }

  /**
   * Gets all concerts on page loading
   */
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Gets all concerts on page loading
   */
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="container-fluid">
      <h1 className="test">Page des users</h1>
      <div className="concerts">
        {users.map((user) => {
          return (
            <div key={user._id}>
              <div
                className="card border-success mb-2 concertCard"
                style={{ maxWidth: 20 + "rem" }}
              >
                <div className="card-header">ID : {user._id}</div>
                <div className="card-body">
                  <p className="card-text">
                    Email : {user.email}
                    <br />
                    {isAdmin ? 
                    <div>
                      <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                      <button type="button" class="btn btn-outline-success" onClick={() => history.push('users/' + user._id)}>Edit</button>
                    </div> : <></>}
                    
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersPage;
