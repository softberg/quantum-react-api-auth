import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const createNewPost = ({ title = "", content = "" }, callback) => {
  const tokens = JSON.parse(localStorage.getItem("credentials"));

  const formData = new FormData();

  formData.set("title", title);
  formData.set("content", content);
  formData.set("refresh_token", tokens.refresh_token);

  Axios.post(`/api-post/amend`, formData, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`
    }
  }).then(({data}) => {
    console.log(data);
  })
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
