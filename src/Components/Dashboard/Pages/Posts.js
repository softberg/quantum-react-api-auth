import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import pajax from "../../../pajax";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const fetchPosts = callback => {
  pajax({
    url: `/api-posts`,
    method: "GET"
  }).then(data => {
    callback(data);
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

  const onPostClick = id => {
    history.push(`/dashboard/single/${id}`);
  };

  return (
    <div className="Posts">
      {posts.map((post, key) => (
        <div
          className="Post"
          onClick={() => {
            onPostClick(post.id);
          }}
          key={key}
        >
          {userInfo.role === "admin" && (
            <button
              className="delete-button"
              onClick={e => {
                e.stopPropagation();
                deletePost(post.id);
              }}
            >
              X
            </button>
          )}

          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
