import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post/Post';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { authUser, createUserWithEmailAndPassword } from './firebase';
import { updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import ImageUpload from './components/ImageUpload/ImageUpload';
import axios from './components/axios.js';
import Pusher from 'pusher-js';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = async () => {
    await axios
      .get('/sync')
      .then((response) => setPosts([...response.data].reverse()));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = authUser.onAuthStateChanged((auth: any) => {
      if (auth) {
        setUser(auth);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID || '', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe('posts');
    channel.bind('inserted', function (data: any) {
      console.log(true);
      fetchPosts();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const signUp = (e: any) => {
    e.preventDefault();

    createUserWithEmailAndPassword(authUser, email, password)
      .then((auth) => updateProfile(auth.user, { displayName: username }))
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(authUser, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenSignIn(false);
  };
  return (
    <div className='app'>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <img className='app__headerImage' src='logo192.png' alt='Header' />
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <img className='app__headerImage' src='logo192.png' alt='Header' />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className='app__header'>
        <div className='app__header'>
          <img className='app__headerImage' src='logo192.png' alt='Header' />
          {user ? (
            <Button onClick={() => authUser.signOut()}>Logout</Button>
          ) : (
            <div className='app__loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>{' '}
              <Button onClick={() => setOpen(true)}>Sign Up</Button>{' '}
            </div>
          )}
        </div>
      </div>

      <div className='app__posts'>
        {posts.map((post: any, index: any) => (
          <Post
            key={index}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className='app__notLogin'>Need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
