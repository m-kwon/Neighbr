import React, { useState } from 'react'
import {
  Avatar, Button, CssBaseline, TextField,
  FormControlLabel, Checkbox, Link, Grid,
  Box, Typography,
  Container } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { emailSignIn, googleSignIn, emailSignUp } from '../../redux/actions/firebase/firebase'
import axios from 'axios';
import useStyles from './styleLogin';
import key from '../Chat/config';
import chat from '../Chat/Chat';

export default function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    passwordConfirm : '',
    zipcode : '',
  }
  const [ formData, setFormData ] = useState(initialState);
  const [ isSignUp, setIsSignUp ] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, passwordConfirm, zipcode } = formData;
    const data = {
      "username": email,
      "first_name": firstName,
      "last_name": lastName,
      "secret": password,
  }
    const config = {
      method: 'post',
      url: 'https://api.chatengine.io/users/',
      headers: {
        'PRIVATE-KEY': key
      },
      data : data
    };
    if (isSignUp) {
      if (password === passwordConfirm) {
        dispatch(emailSignUp(`${firstName} ${lastName}`, email, password, zipcode));
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log('Those passwords didn\’t match. Try again.');
      }
    } else {
      dispatch(emailSignIn(email, password));
      chat(email, password);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {isSignUp &&
          <Grid container spacing={2}>
            <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.firstName}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
          />
          <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.lastName}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            autoFocus
          />
          </Grid>}
          <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.email}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.password}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          {isSignUp &&
          <>
          <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.passwordConfirm}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="passwordConfirm"
            label="Confirm Password"
            name="passwordConfirm"
            autoComplete="password"
            autoFocus
          />

          <TextField
            onChange={(e) => { handleChange(e) }}
            value={formData.zip}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="zipcode"
            label="Zip Code"
            name="zipcode"
            autoComplete="postal-code"
            autoFocus
          />
          </>
          }
          <Button
            type="submit"
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up!" : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={()=>{setIsSignUp(!isSignUp)}}>
                No Account? Sign Up!
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button
          type="input"
          onClick={() => { dispatch(googleSignIn()) }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
            Google Login
          </Button>
      </div>
    </Container>
  );
}
