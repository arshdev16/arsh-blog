import React from "react";
import styles from "../styles/blogfeedstyles.module.css";
import Link from "next/link";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { auth } from "../firebase";

const BlogFeed = ({ blogs }) => {
  return (
    <div className={styles.ParentContainer}>
      <h2 className={styles.Heading}>My Stories</h2>
      <div className={styles.blogsContainer}>
        {blogs ? (
          blogs.map((blog) => <BlogItem blog={blog} key={blog.slug} />)
        ) : (
          <h5>No blogs available</h5>
        )}
      </div>
    </div>
  );
};

const BlogItem = ({ blog }) => {
  const createdAt =
    typeof blog?.createdAt === "number"
      ? new Date(blog.createdAt)
      : blog.createdAt.toDate();
  return (
    <div className={styles.BlogContainer}>
      <div className={styles.TextContainer}>
        <p style={{ margin: 6 }}>
          By {blog.author} on{" "}
          {createdAt.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Link href={`/${blog.slug}`}>
          <h3 style={{ margin: 5 }}>
            <a>{blog.title}</a>
          </h3>
        </Link>
        {auth.currentUser && (
          <Link href={`/admin/${blog.slug}`}>
            <i className="fas fa-edit"></i>
          </Link>
        )}
        <span className={styles.MobilePara}>
          {blog.content.slice(4, 20)}...
        </span>
        <span className={styles.PCPara} style={{ margin: 0, color: "grey" }}>
          {ReactHtmlParser(blog.content.slice(0, 90))}
        </span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80/"
        className={styles.thumbnail}
      />
    </div>
  );
};
export default BlogFeed;
