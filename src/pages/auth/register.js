import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { RegisterAdmin } from "../api/auth";
import Head from "next/head";

export default function Register() {
  const router = useRouter();

  const [err, setErr] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password1Ref = useRef(null);

  const handleRegister = async () => {
    const details = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password1: password1Ref.current.value,
    };
    if (details.password == "" || details.email == "" || details.name == "")
      return setErr("Enter credentials and try again");
    else if (details.password.length < 6)
      return setErr("Password should be min 6 chars long");
    else if (details.password !== details.password1) {
      return setErr("The passwords do not match");
    }
    setErr("");
    let res = await RegisterAdmin(details);
    console.log(res)
    if (res.status && (res.status == 200 || res.status == 201))
      router.push("/auth/login");
    else setErr((res.response && res.response.data.error) || res.message);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="login">
        <section className="login_section register_section">
          <h1>Register</h1>
          <h6>Ragam-Companion</h6>
          <div className="login_form transition_1">
            <input type="text" placeholder="Enter your name" ref={nameRef} />
            <input type="text" placeholder="Enter your email" ref={emailRef} />
            <input
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <input
              type="password"
              placeholder="Enter your password again"
              ref={password1Ref}
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
    </>
  );
}
