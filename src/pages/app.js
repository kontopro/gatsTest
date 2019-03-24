import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import base, {firebaseApp} from '../components/base';
import Login from "../components/Login";

class App extends Component  {

    state = {
        posts: {},        
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
    }
  
    logout = async () => {
      await firebase.auth().signOut();
      this.setState({ user: null });      
    }; 

    creator = {};
    componentDidMount() {        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
              this.authHandler({ user });
            }
        });
        this.postRef = base.syncState('/posts', {
          context: this,
          state: 'posts'
        });
      }
      
      componentWillUnmount() {
        base.removeBinding(this.postRef);
      }
      
      render()    { 
        
        const {uid} = {...this.state.user};
      
        return(
            <div className="app">
                {uid?
                <p>hi sucker {uid}<br/>
                <br/>
                  <button onClick={this.logout}>logout</button>
                </p>:
                <Login authenticate={this.authenticate} />
                }
            </div>
        )
    }
}

export default App