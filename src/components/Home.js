import React from "react"
import {Link} from '@reach/router'
import Login from "../components/Login";

const Home = (props) => (
    <div>
        {props.uid?
            props.isAdmin?
                <div>
                    <h4>you are admin</h4>
                    <p>{props.isEnabled?` SO you are enabled`:` BUT not enabled`}</p>
                    <Link to='/app/users'>users </Link>
                    <Link to='/app/users/new'> | add a new user</Link>
                </div>
                :props.isUser?<p>you are user</p>:
                <div>
                    <p>hi! user: {props.email}</p>
                    <p>ask the admin to add you with your uid :{props.uid}<br/></p>
                    <div>
                        <button type='button' onClick={props.logout}>logout</button>
                    </div>
                </div>
            :
            <Login authenticate={props.authenticate} />
        }
    </div>
)

export default Home