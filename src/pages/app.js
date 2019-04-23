import React, { Component } from "react";
import {Router} from '@reach/router';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import base, {firebaseApp} from '../components/base';
import Roles from "../components/Roles";
import Home from "../components/Home";
import User from "../components/User";
import Profile from "../components/Profile";
import Newuser from "../components/Newuser";

class App extends Component  {

    state = {
        posts: {},
        roles: {},        
        userposts: {},        
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
        .signInWithRedirect(authProvider)
        .then(this.authHandler);
    };  

    authHandler = async authData => {
      await this.setState({user: authData.user});
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
        this.userpostsRef = base.syncState('/user-posts', {
          context: this,
          state: 'userposts'
        });
      }
      
      componentWillUnmount() {
        base.removeBinding(this.postRef);
        base.removeBinding(this.roleRef);
        base.removeBinding(this.userpostsRef);
      }
      
      render()    { 
        
        const {uid, email} = {...this.state.user};
        const roles = {...this.state.roles};
        const userposts = {...this.state.userposts};

        const isAdmin = Object.keys(roles).filter(
          x => roles[x].email === email && roles[x].admin
        ).length>0;

        const isUser = Object.keys(roles).filter(
          x => roles[x].email === email
        ).length>0;

        const isEnabled = Object.keys(roles).filter(
          x => (x === uid)
        ).length>0;
      
        return(
            <div className="app">
                <Router>
                  <Home path='/app' uid={uid} email={email} isAdmin={isAdmin} isUser={isUser} isEnabled={isEnabled} authenticate={this.authenticate} logout={this.logout} />
                  <Roles path='app/users' roles={this.state.roles} email={email} uid={uid} />
                  <Profile path='app/profile' roles={roles} userposts={userposts} email={email} uid={uid} />
                  <Newuser path='app/users/new' isAdmin={isAdmin} addRole={this.addRole} roles={this.state.roles} email={email} uid={uid} />
                  <User path='app/users/:uid' />
                </Router>
            </div>
        )
    }
}

export default App