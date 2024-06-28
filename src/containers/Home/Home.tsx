import React, {useCallback, useEffect, useState} from 'react';
import {ApiPost, Post} from '../../types';
import axiosApi from '../../axiosApi';
import {Link} from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await axiosApi<ApiPost | null>('posts.json');

    const postsResponse = response.data;

    if (postsResponse !== null) {
      const posts: Post[] = Object.keys(postsResponse).map((id: string) => {
        return {
          ...postsResponse[id],
          id,
        };
      });

      setPosts(posts);
    } else {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);



  return (
    <div>
      {posts.length === 0 && (
        <h2>There are no posts yet</h2>
      )}
      {posts.map(post => (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{post.timeCreated}</h6>
            <p className="card-text">{post.text}</p>
            <Link to={`/posts/${post.id}`} className="btn btn-primary">Read More >></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;