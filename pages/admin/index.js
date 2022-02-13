import React, { useEffect, useState } from "react";
import { firestore, auth, blogToJSON } from "../../firebase";
import BlogFeed from "../../components/blogFeed";
import { useRouter } from "next/router";

const adminList = () => {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
   if(!auth.currentUser){
      router.push('/admin/auth/login')
   }


    //Get all the blogs from the database and parse them using blogToJSOn and set them to the state
    firestore
      .collection("blogs")
      .get()
      .then((snapshot) => {
        const blogs = snapshot.docs.map((doc) => blogToJSON(doc));
        setBlogs(blogs);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  console.log(auth.currentUser);

  return <div>{auth.currentUser && <BlogFeed blogs={blogs} />}</div>;
};

export default adminList;
