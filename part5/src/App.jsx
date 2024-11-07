import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import { getLocalStorageToken } from "./services/storage";
import { LogIn } from "./components/Login";
import { blogService } from "./services/blogs";
import { Logout } from "./components/Logout";
import { CreateBlog } from "./components/CreateBlog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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

  const loggedIn = (value) => {
    setIsAuthenticated(value);
  };

  const getNewBlog = (newBlog) => {
    if (!newBlog) return;
    console.log("newBlog", newBlog);
    const newBlogs = blogs.push(newBlog);
    setBlogs(newBlogs);
  };

  if (!isAutenticated) {
    return <LogIn onActive={loggedIn} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      {isAutenticated && (
        <>
          <div>
            {user} logged in <Logout />
          </div>
          <CreateBlog onNewBlogCreated={getNewBlog} />
        </>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
