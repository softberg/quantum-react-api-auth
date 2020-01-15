import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import pajax from "../../../pajax";

import { 
  MdModeEdit,
  MdDelete
} from 'react-icons/md';

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const fetchPosts = callback => {
  pajax({
    url: `/api-posts`,
    method: "GET"
  }).then(data => {



    
    callback(data.data);
  });
};

const Posts = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  if (!posts.length) {
    return <p>No posts found :(</p>;
  }

  const deletePost = id => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    pajax({
      url: `/api-post/delete/${id}`,
      method: "GET"
    }).then(() => {
      setPosts(
        posts.filter(post => {
          if (post.id === id) {
            return false;
          }

          return true;
        })
      );
    });
  };

  
  return (
    <div className="Posts">
      {posts.map((post, key) => (
        <div
          className="Post"
          key={key}
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/dashboard/single/${post.id}`);
          }}
        >
          {userInfo.role === "admin" && (
            <>
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/dashboard/edit/${post.id}`);
                }}
              >
                <MdModeEdit />
              </button>
              <button
                className="delete-button"
                onClick={e => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
              >
                <MdDelete />
              </button>
            </>
          )}
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
