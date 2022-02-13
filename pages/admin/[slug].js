import React from "react";
import BlogOperations from "../../components/BlogOperations";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { auth, firestore } from "../../firebase";
import Link from "next/link";


const Editpost = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!auth.currentUser) {
      router.push("/admin/auth/login");
    }
  }, []);
  return (
    <div>
      <BlogManager />
    </div>
  );
};

const BlogManager = () => {
  const router = useRouter();
  const { slug } = router.query;
  const blogRef = firestore.collection("blogs").doc(slug);
  const [blog] = useDocumentDataOnce(blogRef);

  return (
    <div>
      {blog && (
        <div style={{ margin: 20 }}>
          <section>
            <h1>{blog.title}</h1>
            <p>ID: {blog.slug}</p>
            <BlogOperations blogRef={blogRef} defaultValues={blog} />
          </section>
          <aside>
            <h3>Tools</h3>
            <Link href={`/${blog.slug}`} passHref>
              <button aria-label="live view"  style={{
              color: "white",
              backgroundColor: "rgb(26, 188, 50)",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              border: "none",
            }}F>
                Live view
              </button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Editpost;
