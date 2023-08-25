import React, { useState, useEffect } from "react";
import { validate } from "./validate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "./toast";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data));
  }, [data, touched]);

  const focusHanlder = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };
  const submitHandler = event => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
        notify("You signed up successfully", "success")
    } else {
        notify("Invalid data!", "error")
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
            isAccepted: true
        })
    }
}
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h2>SignUp</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={focusHanlder}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={focusHanlder}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={focusHanlder}
          />
          {errors.password && touched.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={changeHandler}
            onFocus={focusHanlder}
          />
          {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div>
          <label>I accet terms of privacy policy</label>
          <input
            type="checkbox"
            name="isAccepted"
            value={data.isAccepted}
            onChange={changeHandler}
            onFocus={focusHanlder}
          />
          {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
        </div>
        <div>
          <a href="#">Login</a>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
