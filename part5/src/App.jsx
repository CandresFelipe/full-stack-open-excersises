import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import { getLocalStorageToken } from "./services/storage";
import { LogIn } from "./components/Login";
import { blogService } from "./services/blogs";
import { Logout } from "./components/Logout";
import { CreateBlog } from "./components/CreateBlog";
import "./styles.css";
import { Notification } from "./components/Notification";
import { Toggleable } from "./components/Toggleable";
import { BlogList } from "./components/BlogList";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlogState, setNewBlogState] = useState(undefined);
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const createBlogRef = useRef(null);
  const data = getLocalStorageToken();

  useEffect(() => {
    if (!!isAutenticated) return;

    if (data) {
      setIsAuthenticated(data);
    }
  }, [isAutenticated]);

  useEffect(() => {
    if (!isAutenticated) return;
    blogService.setToken(data);
    blogService.getBlogsByUser().then((data) => {
      setBlogs(data.blogs);
      setUser(data.name);
    });
  }, [isAutenticated]);

  useEffect(() => {
    if (!newBlogState) return;

    setTimeout(() => {
      setNewBlogState(undefined);
    }, 5000);
  }, [newBlogState]);

  const loggedIn = (value) => {
    setIsAuthenticated(value);
  };

  const getNewBlog = (newBlog) => {
    if (!newBlog) return;

    setNewBlogState(newBlog);
    setBlogs(blogs.concat(newBlog));
  };

  const loggedout = (value) => {
    setIsAuthenticated(value);
  };

  if (!isAutenticated) {
    return <LogIn onActive={loggedIn} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      {isAutenticated && (
        <>
          <Notification
            message={`A new blog ${newBlogState?.title} by ${newBlogState?.author} added!`}
            type={newBlogState ? "success" : undefined}
          />
          <div>
            {user} logged in <Logout onInactive={loggedout} />
          </div>
          <Toggleable
            ref={createBlogRef}
            toggleLabel={"Create a Blog!"}
            toggleLabelClose={"Cancel"}
          >
            <CreateBlog onNewBlogCreated={getNewBlog} />
          </Toggleable>
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;
