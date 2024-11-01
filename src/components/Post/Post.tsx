import { Avatar } from '@material-ui/core';
import './Post.css';
import React from 'react';

const Post = ({ username, caption, imageUrl }: any) => {
  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt={username}
          src='/static/images/avatar/1.jpg'
        />
        <h3>{username}</h3>
      </div>
      <img className='post__image' src={imageUrl} alt='React' />
      <h4 className='post__text'>
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};
export default Post;
