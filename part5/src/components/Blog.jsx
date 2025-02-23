import { useState } from "react";
import { Toggleable } from "./Toggleable";
import { Button } from "./Button";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

export const Blog = ({ blog, updatedBlog, onDeleteBlog }) => {
  const onUpdateBlog = (event) => {
    event.preventDefault();
    updatedBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const _onDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      onDeleteBlog(blog.id);
    }
  };

  return (
    <div data-testid="blog-item" style={blogStyle}>
      {blog.title}:{" "}
      <Toggleable
        toggleLabel={"Show"}
        testId={"show"}
        toggleLabelClose={"Hide"}
      >
        <p data-testid="p-url">{`url: ${blog.url}`}</p>
        <p data-testid="p-likes">
          {`Likes: ${blog.likes}`}{" "}
          <Button testId={"like"} label={"like"} onClick={onUpdateBlog} />
        </p>
        <p data-testid="p-author">{blog.author}</p>
        <Button testId={"delete"} label={"delete"} onClick={_onDeleteBlog} />
      </Toggleable>
    </div>
  );
};
