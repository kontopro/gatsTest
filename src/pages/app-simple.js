import React, { Component } from "react";
//import firebase from 'firebase/app';
//import 'firebase/database';
//import 'firebase/auth';
import base, {firebaseApp} from '../components/base';

class App extends Component  {

    state = {
        posts: {},
        // myUsers:{},
        user: null
    }


    render()    {
      
        return(
        <div className="app">
            <p>hi</p>
            
        </div>
    )
    }
}
export default App