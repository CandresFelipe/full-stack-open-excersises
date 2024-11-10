import { useEffect, useRef, useState } from "react";
import { Toggleable } from "./Toggleable";
import { Button } from "./Button";

export const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title}:{" "}
      <Toggleable toggleLabel={"Show"} toggleLabelClose={"Hide"}>
        <p>{`url: ${blog.url}`}</p>
        <p>
          {`Likes: ${blog.likes}`} <Button label={"like"} />
        </p>
        <p>{blog.author}</p>
      </Toggleable>
    </div>
  );
};
