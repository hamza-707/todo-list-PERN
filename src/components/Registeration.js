import { useState, useReducer, useEffect } from "react";
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
  if (action.type === "DATA_INPUT_PASSWORD") {
    return {
      value: action.val,
      confirmValue: state.confirmValue,
      isValid:
        action.val.trim().length > 5 && action.value === state.confirmValue,
    };
  } else if (action.type === "DATA_INPUT_CONFIRM-PASSWORD") {
    return {
      value: state.value,
      confirmValue: action.val,
      isValid: state.value.trim().length > 5 && action.val === state.value,
    };
  } else if (action.type === "DATA_VERIFICATION") {
    return {
      value: state.value,
      confirmValue: state.confirmValue,
      isValid:
        state.value.trim().length > 5 && state.value === state.confirmValue,
    };
  }
  return { value: "", confirmValue: "", isValid: false };
};

const Registeration = () => {
  const [emailState, dispatchEmail] = useReducer(emailActionHandler, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordActionHandler, {
    value: "",
    confirmValue: "",
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
    dispatchPassword({ type: "DATA_INPUT_PASSWORD", val: event.target.value });
  };

  const confirmPasswordChangeHandler = (event) => {
    dispatchPassword({
      type: "DATA_INPUT_CONFIRM-PASSWORD",
      val: event.target.value,
    });
  };

  const verifyPasswordHandler = () => {
    dispatchPassword({ type: "DATA_VERIFICATION" });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailState.value,
          password: passwordState.value,
        }),
      });
      if (response) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/4 bg-white rounded-md shadow-md shadow-slate-900">
        <div className=" mx-6 my-5">
          <form onSubmit={formSubmitHandler}>
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
              className="block mb-1 w-full rounded-sm py-1 px-2 bg-slate-300"
              id="password"
              type="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={verifyPasswordHandler}
            />
            <label className="block mb-1" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="block mb-3 w-full rounded-sm py-1 px-2 bg-slate-300"
              id="confirmPassword"
              type="password"
              value={passwordState.confirmValue}
              onBlur={verifyPasswordHandler}
              onChange={confirmPasswordChangeHandler}
            />
            <div className="flex justify-center flex-col items-center">
              <button
                disabled={!formValid}
                type="submit"
                className="py-2 px-5 rounded-md shadow text-white shadow-slate-400 bg-slate-700  hover:bg-slate-900 disabled:bg-gray-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
