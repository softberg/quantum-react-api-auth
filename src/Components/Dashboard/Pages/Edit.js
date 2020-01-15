import React, { useState, useEffect } from "react";
import { Redirect, useParams,useHistory } from "react-router-dom";
import pajax from "../../../pajax";


const setPostOnForm = (id,callback) => {

  pajax({
    url: `/api-post/${id}`,
    method:'GET',
  }).then(({ data }) => {
    
    callback({
      title:(data.title ? data.title : ""),
      content:(data.content ? data.content : ""),
    })
  });

}

const editPost = (id,{ title = "", content = "" }, callback) => {
  const formData = new FormData();

  formData.set("title", title);
  formData.set("content", content);

  pajax({
    url: `/api-post/amend/${id}`,
    method:'POST',
    data: formData
  }).then(() => {
    callback(true);
  });
};

const Post = () => {

  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [problems, setProblems] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {

    if(!id){
      history.push('/dashboard/posts');
    }
  

    setPostOnForm(id, ({
      title = "",
      content = ""
    }) => {
      setTitle(title);
      setContent(content);
    })

    // eslint-disable-next-line 
  },[]);


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

    editPost(id,{ title, content }, setIsCreated);
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
