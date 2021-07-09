import React, { useContext, useState } from "react";
import Field from '../components/forms/Field';
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";

const RegisterPage = ({history}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "basic"
  });

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isCreated, setIsCreated] = useState(false);

  const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const {isAdmin, setIsAdmin } = useContext(AuthContext);

  if(isAuthenticated) {
    history.replace('/concerts');
  }

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
      const statusCode = await api.post("users", user)
      .then((res) => res.status);
      
      setError('');
      if(statusCode === 201)
      {
        setIsCreated(true);
        //history.replace('/login');
      }

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
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <div className="container pt-3">
        <form>
          <fieldset>
            <legend>Créer un compte</legend>
            <Field
              name="email"
              label="Adresse email"
              value={user.email}
              onChange={handleChange}
              placeholder="Entrez votre adresse mail..."
              type="email"
              error={error}
            />
            <Field
              name="password"
              label="Mot de passe"
              value={user.password}
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
              Créer un compte
            </button>
            {isCreated ? <p>Compte créé avec succès, vous pouvez vous log!</p> : <></>}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
