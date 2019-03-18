import React, { Component } from "react";
import base, {firebaseApp} from '../components/base';
import firebase from 'firebase';
import Login from "../components/Login"
require('firebase/auth');

class App extends Component  {

    state = {
        posts: {},
        // myUsers:{},
        user: null
    }

    authenticate = provider => {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };

    authHandler = async authData => {
      await this.setState({user: authData.user});
      this.postRef = base.syncState('/posts', {
        context: this,
        state: 'posts'
      });
    }
  
    logout = async () => {
      await firebase.auth().signOut();
      this.setState({ user: null });
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.authHandler({ user });
          }
        });
        
      }
      
      componentWillUnmount() {
        base.removeBinding(this.postRef);
      }

      addPost = post => {
        const posts = { ...this.state.posts };
        const today=new Date();
        const year = today.getFullYear();
        const month = today.getMonth()+1;
        const day = today.getDate();
        const stringDate = today.toDateString();
        posts[`${Date.now()}`] = {...post, day, month, year, stringDate };
        this.setState({ posts });
      };

      updatePost = (key, updatedPost) => {
        const posts = { ...this.state.posts };
        posts[`${key}`] = updatedPost;
        this.setState({ posts });
      };

      dropPost = (key) =>{
        const posts = { ...this.state.posts };
        posts[`${key}`] = null;
        this.setState({ posts });
      }

    render()    {
      
        return(
        <div className="app">
            <p>hi</p>
            <div>
            {this.state.user?<div><p>welcome αλλά φτιάξε το button  <i>{`${this.state.user.displayName}`}</i></p>
            <button onClick={this.logout}>logout</button></div>:
            <Login authenticate={this.authenticate} />}
            </div>
        </div>
    )
    }
}
export default App