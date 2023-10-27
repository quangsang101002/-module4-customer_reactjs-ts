import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { loginAction, logoutAction } from "../store/actions/auth.action";
import authAPI from "../apis/auth/auth/requests/author.api,";
import { LoginRequest } from "../apis/auth/auth/requests/login-request";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";

function Register() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [showError, setShowError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );

  const handleLoad = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Rest of your login code
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    const allUser = {
      username: userName,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    if (userName && password && firstName && lastName) {
      try {
        await authAPI.AddUser(allUser);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Bạn chưa điền đầy đủ thông tin");
    }
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h2 className="text-center">Register</h2>
              <form onSubmit={handleLoad}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg mb-3"
                    placeholder="UserName"
                    onChange={handleUserName}
                    value={userName}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    id="form1Example13"
                    className="form-control form-control-lg mb-3"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={email}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg mb-3"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={password}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg mb-3"
                    placeholder="First Name"
                    onChange={handleFirstName}
                    value={firstName}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg mb-3"
                    placeholder="Last Name"
                    onChange={handleLastName}
                    value={lastName}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block ml-3"
                  onClick={handleRegister}
                >
                  Tiếp Tục
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
