import { useState } from "react";
import { LoginDetails } from "../../models/loginDetails";
import { LoggedUser } from "../../models/loggedUser";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showInputErrorMessage, setShowInputErrorMessage] = useState({
    email: false,
    password: false,
  });
  const [isEmptyInput, setIsEmptyInput] = useState({
    email: true,
    password: true,
  });
  const [isInvalidDetails, setIsInvalidDetails] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginDetails: LoginDetails = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await fetch("https://localhost:7287/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const response: LoggedUser = await res.json();
      localStorage.setItem("token", response.token);
      navigate("/admin/control-center");
      console.log("Response from loginAction:", response);
    } catch (err) {
      console.error("Failed to login", err);
      setIsInvalidDetails(true);
    }
  }
  function onChangeInput(event) {
    const isEmptyInput = event.target.value === "";

    setIsEmptyInput((prev) => ({
      ...prev,
      [event.target.id]: isEmptyInput,
    }));
    setShowInputErrorMessage((prev) => ({
      ...prev,
      [event.target.id]: isEmptyInput,
    }));
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login__form-container">
        <div className="admin-login__form-title">התחברות:</div>

        <form onSubmit={onSubmit}>
          <div className="admin-login__form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeInput}
            />
            {showInputErrorMessage.email && (
              <div className="admin-login__form-group__error-message semibold">
                * שדה חובה
              </div>
            )}
          </div>

          <div className="admin-login__form-group">
            <label htmlFor="password">סיסמא</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChangeInput}
            />
            {showInputErrorMessage.password && (
              <div className="admin-login__form-group__error-message semibold">
                * שדה חובה
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isEmptyInput.email || isEmptyInput.password}
            className="admin-login__form-button semibold"
          >
            התחבר
          </button>

          {isInvalidDetails && (
            <div className="admin-login__form-group__error-message semibold">
              שם משתמש או סיסמא שגויים, אנא נסה שנית
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
