import React, {useState} from "react"
import {navigate} from 'gatsby'

function Newuser(props){

    const [role, setRole] = useState({isAdmin:false, authuid:'', email:'', signName:'' });

    function createRole(event){
        event.preventDefault();
        if (role.email && role.authuid) 
        {props.addRole(role)};
        event.currentTarget.reset();
        setRole({admin:false, authuid:'', email:'', signName:''});
        navigate('app/users');
    }

    function handleInputChange(event) {        
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setRole({...role, [name]: value});
      }

    if (props.isAdmin){
    return(
    <section className='create-user'>
        <p>User creation</p>
        <form onSubmit={createRole} className='new-user'>
            <label className='admin-label'>administator (be carefull!) <br />
                <input autoFocus value={role.admin} onChange={handleInputChange} type="checkbox" name="admin"/>
            </label>
            <label className='email-label'>email (given by the user) : 
                <input required autoFocus value={role.email} onChange={handleInputChange} type="email" placeholder="email" name="email"/>
            </label>
            <label className='uid-label'> user's uid (given by the user) : 
                <input required autoFocus value={role.authuid} onChange={handleInputChange} type="text" placeholder="uid" name="authuid"/>
            </label>
            <label className='sign-label'>sign Name (name seen by readers) : 
                <input required autoFocus value={role.signName} onChange={handleInputChange} type="text" placeholder="sign-name" name="signName"/>
            </label>
            <button type='submit'>Add</button>
        </form>     
    </section>
    )
    } 
    else {
        return(
            <div>
                <p>Sorry, you are not authorized to create a new user</p>
            </div>
        )
    }
}

export default Newuser