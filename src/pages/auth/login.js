import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { getDetails, setHead } from "../api";
import { LoginAdmin } from "../api/auth";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const [forgotP, setForgotP] = useState(false);
  const [err, setErr] = useState("");
  const emailRef = useRef(null);
  const passwdRef = useRef(null);

  useEffect(() => {
    let temp = localStorage.getItem("details");
    if (temp) {
      let token = JSON.parse(temp).token;
      setHead(token);
      getDetails()
        .then((res) => {
          if (res.status == 200 && res.data) router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //CHECKING IF THERE IS A TOKEN IN STORAGE
  }, []);

  const handleLogin = async () => {
    const details = {
      email: emailRef.current.value,
      password: passwdRef.current.value,
    };
    if (details.email == 0 || details.password == "")
      setErr("Enter credentials and try again");
    else if (details.password.length < 6)
      setErr("Enter a valid password and try again");
    else {
      setErr("");
      let res = await LoginAdmin(details);
      if (res.status && (res.status == 200 || res.status == 201))
        router.push("/");
      else setErr((res.response && res.response.data.error) || res.message);
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="login">
        <section className="login_section">
          {!forgotP && (
            <>
              <h1>Login</h1>
              <h6>Ragam-Companion</h6>
              <div className="login_form">
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="Enter your email"
                />
                <input
                  type="password"
                  ref={passwdRef}
                  placeholder="Enter your password"
                />
                <p
                  className="transition_1"
                  onClick={() => {
                    if (details.email) setForgotP(true);
                    else setForgotP(false);
                  }}
                >
                  Forgot password?
                </p>
              </div>
              <div className={`error ${err ? "message" : ""}`}>{err}</div>
              <button className="login_btn" onClick={handleLogin}>
                Login
              </button>
              <div className="alternative_signup">
                <p>
                  Not a member?{` `}
                  <span
                    className="transition_1"
                    onClick={() => router.push("/auth/register")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </>
          )}
          {forgotP && (
            <div className="forgotP">
              A mail has been sent to the email {details.email}. Check your
              inbox and follow the steps given in the link.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
