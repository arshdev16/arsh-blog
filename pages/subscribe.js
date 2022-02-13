import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import styles from "../styles/Subscribe.module.css";

const Subscribe = () => {
  const FormSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
  });

  //create a function to add the provided email to the firestore database in Subscribe collection
  const subscribe = async (email) => {
    const subscribeRef = firestore.collection("Subscribe");
    const docRef = subscribeRef.doc(email);
    const doc = await docRef.get();
    if (doc.exists) {
      alert("You are already subscribed");
    } else {
      await docRef.set({
        email,
      });
      alert("You have successfully subscribed");
    }
  };

  return (
    <div className={styles.parentContainer}>
      <Formik
        initialValues={{ email: ""}}
        onSubmit={(values) => {
          subscribe(values.email);
        }}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <div className={styles.FormContainer}>
              <h3>Subscribe to our blog</h3>
              <p className={styles.para}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia
              </p>
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
              <button type="submit" className={styles.submitBtn}>
                Subscribe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Subscribe;
