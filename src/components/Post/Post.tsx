import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Post} from '../../types';

interface PostProps {
  onDeletePost: (id: string | undefined) => void;
}

const Post:React.FC<PostProps> = ({onDeletePost}) => {
  const {id} = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosApi.get<Post>(`/posts/${id}.json`);
      setPost(response.data);
    };

    void fetchPost();
  }, [id]);

  if (post === null) {
    return <h2>Loading...</h2>;
  }

  const deletePost = async (postId: string | undefined) => {
    try {
      await axiosApi.delete(`/posts/${id}.json`);
      onDeletePost(postId);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <h2 className='mt-3'>{post.title}</h2>
        <h6>{new Date(post.timeCreated).toLocaleString()}</h6>
        <p>{post.text}</p>
        <Link to={`/posts/${id}/edit`} className="btn btn-primary mt-2">Edit >></Link>
        <button className="btn btn-danger ms-3 mt-2" onClick={() => {
          if (post) {
            deletePost(post.id);
          }
        }}
        >
          Delete x
        </button>
      </div>

    </div>
  );
};

export default Post;