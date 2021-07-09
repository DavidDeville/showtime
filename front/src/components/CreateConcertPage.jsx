import React, { useContext, useState } from "react";
import Field from './forms/Field';
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";

const CreateConcertPage = ({history}) => {
  const [concert, setConcert] = useState({
    name: "",
    date: "",
    place: ""
  });

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const {isAdmin, setIsAdmin } = useContext(AuthContext);

  

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
      const concertCreation = await api.post("concerts", concert)
      .then((res) => console.log(res));
      
      setError('');

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

  return (
    <div>
      <div className="container pt-3">
        <form>
          <fieldset>
            <legend>Création d'un concert</legend>
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
              Créer le concert
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateConcertPage;
