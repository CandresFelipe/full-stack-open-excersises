import { useEffect, useState } from "react";
import { blogService } from "../services/blogs";
import { Blog } from "./Blog";

export const BlogList = ({ blogs }) => {
  const [_blogs, set_Blogs] = useState(blogs);

  useEffect(() => {
    if (_blogs.length) return;

    set_Blogs(blogs);
  }, [blogs]);

  const onUpdateBlog = async (blog) => {
    await blogService.updateBlog(blog);
  };

  const onDeleteBlog = async (id) => {
    await blogService.deleteBlog(id);
    const updatedBlogs = _blogs.filter((blog) => blog.id !== id);
    set_Blogs(updatedBlogs);
  };

  const sortedBlogs = (bgs) => bgs?.sort((a, b) => a.likes - b.likes);

  return (
    <div>
      {sortedBlogs(_blogs).map((blog) => (
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
