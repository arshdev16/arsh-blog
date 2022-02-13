import React from "react";
import styles from "../../../styles/subscribe.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { firestore, auth } from "../../../firebase";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const FormSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password"),
  });

  const onLogin = (email, password) => {
    try {
      //Login the user using the email and password provided
      auth.signInWithEmailAndPassword(email, password).catch((err) => {
        console.error(err);
        router.push("/");
      });
      //Check if a user document with same email exists in the database in admins collection
      if (auth.currentUser !== null) {
        firestore
          .collection("admins")
          .where("email", "==", email)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              //Sign out the user
              alert("You are not an admin");
              auth.signOut();
              //If the user does not exist in the database, then redirect to the login page
              router.push("/");
            } else {
              //If the user exists in the database, then redirect to the admin dashboard
              router.push("/admin/");
            }
          })
          .catch((err) => console.log(err));
      } else {
        router.push("/");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <div className={styles.FormContainer}>
              <h3>Admin Login</h3>
              <div className={styles.inputContainer}>
                <lable htmlFor="email">Your email</lable>
                <input
                  id="email"
                  className={styles.input}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="email"
                  type="email"
                />
              </div>
              <div className={styles.inputContainer}>
                <lable htmlFor="password">Your Password</lable>
                <input
                  id="password"
                  className={styles.input}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="password"
                  type="password"
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
