import React from "react"
import {Link} from '@reach/router'
import Login from "../components/Login";
import Logout from "../components/Logout";

const Home = (props) => (
    <section className='app-home'>
        {props.uid?
            props.isAdmin?
                <div className='app-home-admin'>
                    <h4>you are admin</h4>
                    <p>{props.isEnabled?` SO you are enabled`:` BUT not enabled`}</p>
                    <nav>
                    <Link to='/app/profile/' className='global-smooth-card'>my Profile</Link>
                    <Link to='/app/users' className='global-smooth-card'>users</Link>
                    <Link to='/app/users/new' className='global-smooth-card'>add a new user</Link>
                    </nav>
                    <Logout logout={props.logout}/>
                </div>
                :props.isUser?<p>you are user</p>:
                    <div>
                        <p>hi! user: {props.email}</p>
                        <p>ask the admin to add you with your uid :{props.uid}<br/></p>
                        <Logout logout={props.logout}/>
                    </div>
            :
            <Login authenticate={props.authenticate} />
        }
    </section>
)

export default Home