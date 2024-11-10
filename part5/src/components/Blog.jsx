import { useEffect, useRef, useState } from "react";
import { Toggleable } from "./Toggleable";
import { Button } from "./Button";

export const Blog = ({ blog, updatedBlog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const onUpdateBlog = () => {
    setLikes(likes + 1);
    updatedBlog({
      ...blog,
      likes: likes + 1,
    });
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
      </Toggleable>
    </div>
  );
};
