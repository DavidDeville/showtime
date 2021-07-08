import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";
import "../style/style.css";

const ConcertsPage = () => {
  const [concerts, setConcerts] = useState([]);

  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const {isAdmin, setIsAdmin } = useContext(AuthContext);

  /**
   * API call to fetch the concerts
   */
  const fetchConcerts = async () => {
    try {
      const data = await api.get("concerts");
      setConcerts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle concert delete feature
   */
  const handleDelete = async (id) => {
    const originalConcerts = [...concerts];
    setConcerts(concerts.filter((concert) => concert._id !== id));
    console.log(id);
    try {
      const data = await api.deleter("concerts/" +id)
    } catch (error) {
      console.log(error);
      setConcerts(originalConcerts);
    }
  }

  /**
   * Gets all concerts on page loading
   */
  useEffect(() => {
    fetchConcerts();
  }, []);

  /**
   * Gets all concerts on page loading
   */
  useEffect(() => {
    console.log(concerts);
  }, [concerts]);

  return (
    <div className="container-fluid">
      <h1 className="test">Page des concerts</h1>
      <div className="concerts">
        {concerts.map((concert) => {
          return (
            <div key={concert._id}>
              <div
                className="card border-success mb-2 concertCard"
                style={{ maxWidth: 20 + "rem" }}
              >
                <div className="card-header">Nom : {concert.name}</div>
                <div className="card-body">
                  <p className="card-text">
                    Lieu : {concert.place}
                    <br />
                    Date : {concert.date}
                    <br />
                    {isAdmin ? 
                    <div>
                      <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(concert._id)}>Delete</button>
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

export default ConcertsPage;
