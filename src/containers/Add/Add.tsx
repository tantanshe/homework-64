import React, {useCallback, useEffect, useState} from 'react';
import {ApiPost, Post} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';

const initialState = {
  title: '',
  text: '',
  timeCreated: '',
};
const Add = () => {
  const {id} = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>(initialState);
  const navigate = useNavigate();

  const fetchOnePost = useCallback(async (id: string) => {
    const response = await axiosApi.get<ApiPost | null>(`posts/${id}.json`);
    if (response.data) {
      setPost(response.data);
    }
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOnePost(id);
    } else {
      setPost(initialState);
    }
  }, [id, fetchOnePost]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      title: post.title,
      text: post.text,
      timeCreated: post.timeCreated || new Date().toString(),
    };

    try {
      if (id !== undefined) {
        await axiosApi.put(`/posts/${id}.json`, newPost);
      } else {
        await axiosApi.post('/posts.json', newPost);
      }
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <form onSubmit={onFormSubmit}>
          <div className="form-group mt-2">
            <h2>{id ? 'Edit your post' : 'Add a new post'}</h2>
            <label htmlFor="title">Title of your post</label>
            <input
              id="title"
              type="text"
              name="title"
              className="form-control"
              value={post.title}
              onChange={onFieldChange}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="text">Text of your post</label>
            <input
              id="text"
              type="text"
              name="text"
              className="form-control"
              value={post.text}
              onChange={onFieldChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {id ? 'Save changes' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;