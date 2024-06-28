import React, {useState} from 'react';
import {Post} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';

const Add = () => {
  const [post, setPost] = useState<Post>({
    title: '',
    text: '',
    timeCreated: '',
  });
  const navigate = useNavigate();

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
      timeCreated: new Date().toString(),
    };

    try {
      await axiosApi.post('/posts.json', newPost);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title of your post</label>
            <input
              id="title"
              type="text"
              name="title"
              className="form-control"
              value={post.title}
              onChange={onFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Text of your post</label>
            <input
              id="text"
              type="text"
              name="text"
              className="form-control"
              value={post.text}
              onChange={onFieldChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;