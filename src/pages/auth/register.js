import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    password1: "",
    name: "",
  });
  const [err, setErr] = useState("");

  const handleRegister = async () => {
    let flag = false;
    if (details.password == "" || details.email == "" || details.name == "")
      return setErr("Enter credentials and try again");
    else if (details.password.length < 6)
      return setErr("Password should be min 6 chars long");
    else if (details.password !== details.password1) {
      return setErr("The passwords do not match");
    }
    setErr("");
  };

  return (
    <div className="login">
      <section className="login_section register_section">
        <h1>Register</h1>
        <h6>Ragam-Companion</h6>
        <div className="login_form transition_1">
          <input
            type="text"
            value={details.name}
            placeholder="Enter your name"
            onChange={(e) => {
              setDetails({ ...details, name: e.target.value });
            }}
          />
          <input
            type="text"
            value={details.email}
            placeholder="Enter your email"
            onChange={(e) => {
              setDetails({ ...details, email: e.target.value });
            }}
          />
          <input
            type="password"
            value={details.password}
            placeholder="Enter your password"
            onChange={(e) => {
              setDetails({ ...details, password: e.target.value });
            }}
          />
          <input
            type="password"
            value={details.password1}
            placeholder="Enter your password again"
            onChange={(e) => {
              setDetails({ ...details, password1: e.target.value });
            }}
          />
          <div className={`error ${err ? "message" : ""}`}>{err}</div>
        </div>
        <button className="login_btn" onClick={handleRegister}>
          Register
        </button>
        <div className="alternative_signup">
          <p>
            Already a member?{` `}
            <span
              className="transition_1"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
