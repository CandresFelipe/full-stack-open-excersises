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
  const [likes, setLikes] = useState(blog.likes);

  const onUpdateBlog = () => {
    setLikes(likes + 1);
    updatedBlog({
      ...blog,
      likes: likes + 1,
    });
  };

  const _onDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      onDeleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}:{" "}
      <Toggleable toggleLabel={"Show"} toggleLabelClose={"Hide"}>
        <p>{`url: ${blog.url}`}</p>
        <p>
          {`Likes: ${likes}`} <Button label={"like"} onClick={onUpdateBlog} />
        </p>
        <p>{blog.author}</p>
        <Button label={"delete"} onClick={_onDeleteBlog} />
      </Toggleable>
    </div>
  );
};
