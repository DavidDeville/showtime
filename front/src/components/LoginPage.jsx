import React, { useState } from "react";
import Field from '../components/forms/Field';
import api from "../services/authAPI";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const token = api.post("auth/login", credentials);
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
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div>
      <div className="container pt-3">
        <form>
          <fieldset>
            <legend>Connexion</legend>
            <Field
              name="email"
              label="Adresse email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Entrez votre adresse mail..."
              type="email"
              error={error}
            />
            <Field
              name="password"
              label="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe..."
              type="password"
            />
            {error ? <p className="text-error">{errorMessage}</p> : <></>}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Se connecter
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
