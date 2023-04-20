import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const {logIn} = useContext(AuthContext);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location)

  const from = location.state?.from?.pathname || '/';
  const handleLogIn = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setError('');
    
    logIn(email, password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      form.reset();
      navigate(from, {replace: true});
    })
    .catch(error => {
      setError(error.message)
    })
  }
  return (
    <div className="form-container">
      <h2 className="form-title">Please Login here</h2>
      <form onSubmit={handleLogIn}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <input className="btn-submit" type="submit" value="Login" />
        </div>
      </form>
      <p><small>New to Ema-John? <Link to="/sign-up">Create New Account</Link></small></p>
      <p className="text-error">{error}</p>
    </div>
  );
};

export default Login;
