import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import pajax from "../../../pajax";

const createNewPost = ({ title = "", content = "" }, callback) => {

  const formData = new FormData();

  formData.set("title", title);
  formData.set("content", content);

  pajax({
    url: `/api-post/amend`,
    method:'POST',
    data: formData
  }).then(() => {
    callback(true);
  });
};

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [problems, setProblems] = useState([]);

  const [isCreated, setIsCreated] = useState(false);

  const onFormSubmit = e => {
    e.preventDefault();

    let errors = [];

    if (!title.length) {
      errors.push("Title is required");
    }

    if (!content.length) {
      errors.push("Content is required");
    }

    setProblems(errors);

    if (errors.length) {
      return;
    }

    createNewPost({ title, content }, setIsCreated);
  };

  if (isCreated) {
    return <Redirect to="/dashboard/posts" />;
  }

  return (
    <div className="Post">
      <div
        className="logs"
        style={{ display: problems.length ? "block" : "none" }}
      >
        <ul>
          {problems.map((problem, key) => (
            <li key={key}>{problem}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={onFormSubmit}>
        <input
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          value={title}
          placeholder="Title"
        />
        <textarea
          onChange={({ target }) => {
            setContent(target.value);
          }}
          value={content}
          placeholder="Content"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Post;
