import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

const emailActionHandler = (state, action) => {
  if (action.type === "DATA_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "DATA_VERIFICATION") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordActionHandler = (state, action) => {
  if (action.type === "DATA_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  } else if (action.type === "DATA_VERIFICATION") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [emailState, dispatchEmail] = useReducer(emailActionHandler, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordActionHandler, {
    value: "",
    isValid: null,
  });
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "DATA_INPUT", val: event.target.value });
  };

  const verifyEmailHandler = () => {
    dispatchEmail({ type: "DATA_VERIFICATION" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "DATA_INPUT", val: event.target.value });
  };

  const verifyPasswordHandler = () => {
    dispatchPassword({ type: "DATA_VERIFICATION" });
  };

  const registerClickHandler = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  const submitFormHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          email: emailState.value,
          password: passwordState.value,
        }),
      });
      const jsonData = await response.json();
      const { user_id } = jsonData;
      navigate(`/home/${user_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/4 bg-white rounded-md shadow-md shadow-slate-900">
        <div className="mx-6 my-5">
          <form onSubmit={submitFormHandler}>
            <label className="block mb-1" htmlFor="email">
              Email:
            </label>
            <input
              className="block mb-1 w-full rounded-sm py-1 px-2 bg-slate-300"
              id="email"
              type="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={verifyEmailHandler}
            />
            <label className="block mb-1" htmlFor="password">
              Password:
            </label>
            <input
              className="block mb-3 w-full rounded-sm py-1 px-2 bg-slate-300"
              id="password"
              type="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={verifyPasswordHandler}
            />
            <div className="flex justify-center flex-col items-center">
              <button
                type="submit"
                className="py-2 px-5 mb-3 rounded-md shadow text-white shadow-slate-400 bg-slate-700  hover:bg-slate-900 disabled:bg-gray-500"
                disabled={!formValid}
              >
                Login
              </button>
              <p className=" text-sm">
                Not a User? Click here to{" "}
                <a
                  onClick={registerClickHandler}
                  className=" text-cyan-700 hover:text-cyan-900"
                  href="/"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
