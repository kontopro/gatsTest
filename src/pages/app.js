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
    
    render()    {      
        return(
            <div className="app">
                {this.state.user?
                <p>hi..
                  <button onClick={this.logout}>logout</button>
                </p>:
                <Login authenticate={this.authenticate} />
                }
            </div>
        )
    }
}

export default App