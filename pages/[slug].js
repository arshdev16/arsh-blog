import React from "react";
import { firestore, blogToJSON } from "../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "../styles/blogpost.module.css";
import BlogContent from "../components/BlogContent";
import Comment from "../components/Comment";

export async function getStaticProps({ params }) {
  const { slug } = params;

  let blog;
  let path;

  const blogRef = firestore.collection("blogs").doc(slug);
  blog = blogToJSON(await blogRef.get());
  path = blogRef.path;
  if (blog.createdAt === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog, path },
  };
}
export async function getStaticPaths() {
  const snapshot = await firestore.collection("blogs").get();
  const paths = snapshot.docs.map((doc) => {
    const { slug } = doc.data();
    return {
      params: { slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

const Blog = (props) => {
  const blogRef = firestore.doc(props.path);
  const [realtimeBlog] = useDocumentData(blogRef);

  const blog = realtimeBlog || props.blog;

  return (
    <div className={styles.ParentContainer}>
      <BlogContent blog={blog} />
      <Comment blog={blog} />
    </div>
  );
};

export default Blog;
