import { blogService } from "../services/blogs";
import { Blog } from "./Blog";

export const BlogList = ({ blogs }) => {
  const onUpdateBlog = async (blog) => {
    console.log("blog", blog);
    await blogService.updateBlog(blog);
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updatedBlog={onUpdateBlog} />
      ))}
    </div>
  );
};
