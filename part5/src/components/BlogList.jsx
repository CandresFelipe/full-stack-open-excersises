import { useState, useEffect } from "react";
import { blogService } from "../services/blogs";
import { Blog } from "./Blog";

export const BlogList = ({ blogs }) => {
  const [blogList, setBlogList] = useState([]);

  // Sync blogList state with props
  useEffect(() => {
    setBlogList(blogs);
  }, [blogs]);

  const onUpdateBlog = async (updatedBlog) => {
    const response = await blogService.updateBlog(updatedBlog);

    // Update state correctly by replacing the updated blog
    setBlogList((prevBlogs) =>
      prevBlogs.map((b) => (b.id === response.id ? response : b))
    );
  };

  const onDeleteBlog = async (id) => {
    await blogService.deleteBlog(id);
    setBlogList((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
  };

  // Sorting blogs based on likes (highest first)
  const sortedBlogs = blogList.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div data-testid="blog-list">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updatedBlog={onUpdateBlog}
          onDeleteBlog={onDeleteBlog}
        />
      ))}
    </div>
  );
};
