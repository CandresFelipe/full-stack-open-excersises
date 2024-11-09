import { useState } from "react";
import { Form } from "./Form";
import { blogService } from "../services/blogs";

export const CreateBlog = ({ onNewBlogCreated }) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const onChangeAuthor = (event) => setAuthor(event.target.value);
  const onChangeUrl = (event) => setUrl(event.target.value);
  const onChangeTitle = (event) => setTitle(event.target.value);

  const inputs = [
    {
      label: "Title",
      onChange: onChangeTitle,
      value: title,
    },
    {
      label: "Author",
      onChange: onChangeAuthor,
      value: author,
    },
    {
      label: "Url",
      onChange: onChangeUrl,
      value: url,
    },
  ];

  const onCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
      });
      onNewBlogCreated(newBlog);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      console.log("[createBlog]:", error);
    }
  };

  return (
    <div>
      <p>Create new blog</p>
      <Form inputs={inputs} onSubmit={onCreateBlog} buttonLabel={"create"} />
    </div>
  );
};
