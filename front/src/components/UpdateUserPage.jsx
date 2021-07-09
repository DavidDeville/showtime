import React, { useContext, useEffect, useState } from "react";
import Field from "./forms/Field";
import AuthContext from "../contexts/AuthContext";
import api from "../services/authAPI";

const UpdateUserPage = (props) => {
  const { id } = props.match.params;

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
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
  const fetchUser = async (id) => {
    //console.log(id);
    const data = await api.get("users/" + id);
    const { email, password, role } = data.data;
    setUser({ email, password, role });
  };

  /**
   * Handle the API call to authenticate the user
   * Sets the token into the local storage and in axios headers on success,
   * displays an error otherwise
   *
   * @param {object} event - event triggered on submit
   */

  const handleSubmit = async (event) => {
    console.log(user);
    event.preventDefault();
    console.log(user);
    setError(false);
    try {
      const userUpdate = await api
        .put("users", id, user)
        .then((res) => console.log(res));
      console.log(userUpdate);
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
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  return (
    <div>
      <div className="container pt-3">
        <form>
          <fieldset>
            <legend>Modification d'un utilisateur</legend>
            <Field
              name="email"
              label="Email de l'utilisateur"
              value={user.email}
              onChange={handleChange}
              placeholder="Entrez l'email de l'utilisateur..."
              type="email"
              error={error}
            />
            <Field
              name="password"
              label="Mot de passe de l'utilisateur"
              value={user.password}
              onChange={handleChange}
              placeholder="Entrez le mot de passe de l'utilisateur..."
              type="password"
            />
            <Field
              name="role"
              label="Le role de l'utilisateur"
              value={user.role}
              onChange={handleChange}
              placeholder="Entrez le lieu du concert..."
              type="text"
            />
            {error ? <p className="text-error">{errorMessage}</p> : <></>}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Modifier l'utilisateur
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
