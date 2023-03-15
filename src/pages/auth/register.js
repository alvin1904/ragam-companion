import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { RegisterAdmin } from "../api/auth";
import Head from "next/head";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import { themes, types } from "@/components/ErrorHandler/config";

export default function Register() {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END

  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password1Ref = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const details = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password1: password1Ref.current.value,
    };
    if (details.password == "" || details.email == "" || details.name == "")
      return showMessage(
        "Enter credentials and try again",
        themes.light,
        types.warning
      );
    else if (details.password.length < 6)
      return showMessage(
        "Passwords should be min 6 chars long",
        themes.light,
        types.warning
      );
    else if (details.password !== details.password1) {
      return showMessage("The passwords do not match");
    }
    let res = await RegisterAdmin(details);
    console.log(res);
    if (res.status && (res.status == 200 || res.status == 201))
      showMessage(
        "Account created. Now, verify your email and head to login.",
        themes.light,
        types.info
      );
    else showMessage((res.response && res.response.data.error) || res.message);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="login">
        <ErrorHandler show={show} {...messageProps} />
        <section className="login_section register_section">
          <h1>Register</h1>
          <h6>Ragam-Companion</h6>
          <form className="login_form transition_1" onSubmit={handleRegister}>
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
            <button className="login_btn" type="submit">
              Register
            </button>
          </form>
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
