import React, { useContext, useEffect, useState } from "react";
import Field from "./forms/Field";
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";

const UpdateConcertPage = (props) => {
  const { id } = props.match.params;

  const [concert, setConcert] = useState({
    name: "",
    date: "",
    place: "",
  });

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isModified, setIsModified] = useState(true);

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const { isAdmin, setIsAdmin } = useContext(AuthContext);

  /**
   * Fetch the concert if in editing mode
   * @param {int} id - the concert id
   */
  const fetchConcert = async (id) => {

    const data = await api.get("concerts/" + id);
    const { name, date, place } = data.data;
    setConcert({ name, date, place });
  };

  /**
   * Handle the API call to authenticate the user
   * Sets the token into the local storage and in axios headers on success,
   * displays an error otherwise
   *
   * @param {object} event - event triggered on submit
   */

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);

    try {
      const concertUpdate = await api
        .put("concerts", id, concert)
        .then((res) => console.log(res));

      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handle the form input changes
   *
   * @param {object} currentTarget - target of the form fields
   */
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setConcert({ ...concert, [name]: value });
  };

  useEffect(() => {
    fetchConcert(id);
  }, []);

  return (
    <div>
      <div className="container pt-3">
        <form>
          <fieldset>
            <legend>Modification d'un concert</legend>
            <Field
              name="name"
              label="Nom du concert"
              value={concert.name}
              onChange={handleChange}
              placeholder="Entrez le nom du concert..."
              type="email"
              error={error}
            />
            <Field
              name="date"
              label="Date du concert"
              value={concert.date}
              onChange={handleChange}
              placeholder="Entrez la date du concert..."
              type="date"
            />
            <Field
              name="place"
              label="Lieu du concert"
              value={concert.place}
              onChange={handleChange}
              placeholder="Entrez le lieu du concert..."
              type="email"
            />
            {error ? <p className="text-error">{errorMessage}</p> : <></>}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Modifier le concert
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateConcertPage;
