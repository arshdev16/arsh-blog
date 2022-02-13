import React from "react";
import styles from "../styles/blogpost.module.css";
import ReactHtmlParser from "react-html-parser";
import he from "he";

const BlogContent = ({ blog }) => {
  const createdAt =
    typeof blog?.createdAt === "number"
      ? new Date(blog.createdAt)
      : blog.createdAt.toDate();

  //calculate how many minutes will it take to read the blog
  const wordCount = blog?.content.trim().split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className={styles.BlogContaier}>
      <p
        style={{
          margin: 0,
          fontSize: 10,
          color: "grey",
          alignSelf: "flex-start",
        }}
      >
        {createdAt.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        {readingTime > 1
          ? ` - ${readingTime} minutes to read`
          : ` - ${readingTime} minute to read`}
      </p>
      <h1 style={{ margin: 0 }}>{blog.title}</h1>
      {ReactHtmlParser(he.decode(blog.content))}
    </div>
  );
};

export default BlogContent;
