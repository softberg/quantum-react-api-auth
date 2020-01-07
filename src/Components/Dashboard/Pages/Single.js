import React, { useState, useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import pajax from "../../../pajax";


const setPostOnForm = (id,callback) => {

  pajax({
    url: `/api-post/${id}`,
    method:'GET',
  }).then((res) => {
    callback({
      title:(res.title ? res.title : ""),
      content:(res.content ? res.content : ""),
    })
  });

}

const Post = () => {

  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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


  return (
    <div className="Single">
      <h2>{title}</h2>
      <h3>{content}</h3>
    </div>
  );
};

export default Post;
