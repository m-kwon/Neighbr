import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';

import actions from '../../redux/actions/index';
import Post from './Post';



export default (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const location = useLocation();
  const AUTH = useSelector(state => state.firebase);
  const userId = AUTH?.user?.uid;

  useEffect(() => {
    if (location.pathname === '/') {
      actions.posts(dispatch);
    } else if (location.pathname === '/profile') {
      dispatch(actions.getPostsByUserId(userId));
    }
  }, []);

  return (
    <>
      {posts.map((p) => <div className="post-list-item" key={p._id}><Post post={p} /></div>)}
    </>
  );
};
