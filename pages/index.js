import Image from "../components/Image";
import { firestore, blogToJSON, fromMillis } from "../firebase";
import React, { useState } from "react";
import BlogFeed from "../components/BlogFeed";

const LIMIT = 10;

export async function getServerSideProps(context) {
  //blog reference
  const blogsQuery = firestore
    .collection("blogs")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  //gettin all the blogs
  const blogs = (await blogsQuery.get()).docs.map(blogToJSON);
  let isEnd = false;
  if (blogs.length < LIMIT) {
    isEnd = true;
  }
  return {
    props: { blogs, isEnd }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [blogs, setblogs] = useState(props.blogs);
  const [isEnd, setIsEnd] = useState(props.isEnd);

  // Get next page in pagination query
  const getMoreblogs = async () => {
    const last = blogs[blogs.length - 1];
    if (typeof last != "undefined") {
      const cursor =
        typeof last.createdAt === "number"
          ? fromMillis(last.createdAt)
          : last.createdAt;

      const query = firestore
        .collection("blogs")
        .where("published", "==", true)
        .orderBy("createdAt", "desc")
        .startAfter(cursor)
        .limit(LIMIT);

      const newblogs = (await query.get()).docs.map((doc) => doc.data());
      setblogs(blogs.concat(newblogs));
      if (newblogs.length < LIMIT) {
        setIsEnd(true);
      }
    } else {
      setIsEnd(true);
    }
  };

  return (
    <div>
      <Image />
      <BlogFeed blogs={blogs} />
      {isEnd ? (
        <h6 style={{ margin: 20, marginTop: 10, marginBottom: 15 }}>
          No more blogs available
        </h6>
      ) : (
        <button
          aria-label="show more blogs"
          onClick={getMoreblogs}
          style={{
            margin: 20,
            marginTop: 10,
            marginBottom: 15,
            color: "#fff",
            backgroundColor: "#000",
            border: "none",
            padding: 10,
            borderRadius: 10,
          }}
        >
          Show more blogs
        </button>
      )}
    </div>
  );
}
