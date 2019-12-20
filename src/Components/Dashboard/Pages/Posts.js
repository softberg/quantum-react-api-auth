import React, { useEffect, useState } from "react";
import Axios from "axios";

const fetchPosts = callback => {
  const tokens = JSON.parse(localStorage.getItem("credentials"));

  Axios({
    url:`/api-posts?refresh_token=${tokens.refresh_token}`,
    method:'GET',
    headers:{
      "Authorization": `Bearer ${tokens.access_token}`
    }
  }).then(({ data }) => {
    if(!data.status){
      callback(data);
    }
  })

};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);


  if(!posts.length){
    return (
      <p>No posts found :(</p>
    )
  }

  return (
    <div className="Posts">
      {posts.map((post, key) => (
        <div className="Post" key={key}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );

};

export default Posts;
