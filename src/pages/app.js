import React, { Component } from "react";
import {Router} from '@reach/router';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import base, {firebaseApp} from '../components/base';
import Roles from "../components/Roles";
import Home from "../components/Home";
import User from "../components/User";
import Newuser from "../components/Newuser";

class App extends Component  {

    state = {
        posts: {},
        roles: {},        
        user: null
    }

    addRole = (role)  => {
      const roles = {...this.state.roles};
      const { authuid } = role;
      roles[`${authuid}`] = {...role}
      this.setState({roles})
    }

    updateRole = (role, key) => {
      const roles = {...this.state.roles};
      roles[key] = role;
      this.setState({ roles })
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
      console.log(authData.user.email)   
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

        this.postRef = base.syncState('/posts', {
          context: this,
          state: 'posts'
        });

        this.roleRef = base.syncState('/roles', {
          context: this,
          state: 'roles'
        });
      }
      
      componentWillUnmount() {
        base.removeBinding(this.postRef);
        base.removeBinding(this.roleRef);
      }
      
      render()    { 
        
        const {uid, email} = {...this.state.user};
        const roles = {...this.state.roles};

        const isAdmin = Object.keys(roles).filter(
          x => roles[x].email === email && roles[x].admin
        ).length>0;

        const isUser = Object.keys(roles).filter(
          x => roles[x].email === email
        ).length>0;

        const isEnabled = Object.keys(roles).filter(
          x => (x === uid)
        ).length>0;

        console.log(`is admin:${isAdmin}`)
        console.log(`exists:${isUser}`)
        console.log(`correct key(uid):${isEnabled}`)
      
        return(
            <div className="app">
                <Router>
                  <Home path='/app' uid={uid} email={email} isAdmin={isAdmin} isUser={isUser} isEnabled={isEnabled} authenticate={this.authenticate} logout={this.logout} />
                  <Roles path='app/users' roles={this.state.roles} email={email} uid={uid} />
                  <Newuser path='app/users/new' isAdmin={isAdmin} addRole={this.addRole} roles={this.state.roles} email={email} uid={uid} />
                  <User path='app/users/:uid' />
                </Router>
            </div>
        )
    }
}

export default App