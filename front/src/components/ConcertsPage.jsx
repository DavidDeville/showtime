import React, { useEffect, useState } from "react";
import api from "../services/authAPI";
import "../style/style.css";

const ConcertsPage = () => {
  const [concerts, setConcerts] = useState([]);

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
