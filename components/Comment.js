import React, { useState, useEffect } from "react";
import { firestore, serverTimeStamp } from "../firebase";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "../styles/Comments.module.css";
import Image from "next/image";
import toast from "react-hot-toast";

const Comment = ({ blog }) => {
  return (
    <div className={styles.ParentContainer}>
      <h4 style={{ margin: 3 }}>SHare your thoughts</h4>
      <CommentForm blog={blog} />
      <h5 style={{ margin: 10, alignSelf: "flex-start" }}>comments:-</h5>
      <ShowComments blog={blog} />
    </div>
  );
};

const CommentForm = ({ blog }) => {
  const FormSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters"),
    comment: Yup.string().min(3, "Comment must be at least 3 characters"),
  });

  //Create a function to assign the provided name and comment to the firestore database in Comment collection
  const addComment = async (name, comment) => {
    try {
      const commentRef = firestore
        .collection("blogs")
        .doc(blog.slug)
        .collection("comments");

      await commentRef.add({
        name,
        comment,
        createdAt: serverTimeStamp(),
      });
      toast.success("Comment added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error adding comment");
    }
  };

  return (
    <div className={styles.FormContainer}>
      <Formik
        initialValues={{ username: "", comment: "" }}
        onSubmit={(values) => {
          addComment(values.username, values.comment);
        }}
        validationSchema={FormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form>
            <div className={styles.FieldContainer}>
              <label htmlFor="username" className={styles.Label}>
                Name:
              </label>
              <input
                id="username"
                className={styles.Input}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="Name (optional)"
                type="text"
              />
            </div>
            <div className={styles.FieldContainer}>
              <label htmlFor="comment" className={styles.Label}>
                Comment:
              </label>
              <textarea
                id="comment"
                className={styles.Input}
                onChange={handleChange("comment")}
                onBlur={handleBlur("comment")}
                value={values.comment}
                placeholder="Comment"
                type="text"
              />
            </div>
            <button type="submit" className={styles.SubmitBtn}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ShowComments = ({ blog }) => {
  //define state named comments
  const [comments, setComments] = useState([]);

  //useEffect to fetch the comments from firestore
  useEffect(() => {
    const unsubscribe = firestore
      .collection("blogs")
      .doc(blog.slug)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(newComments);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.CommentsContainer}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.CommentContainer}>
          <div>
            <Image
              src="/pfp.png"
              alt="Default profile picture"
              width={55}
              height={55}
            />
          </div>
          <div>
            <h6 style={{ margin: 5 }}>{comment.name}</h6>
            <p style={{ margin: 5 }}>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
