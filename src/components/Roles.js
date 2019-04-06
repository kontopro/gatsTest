import React from "react"
import {Link} from '@reach/router'
import "./roles.css"

function Roles (props) {
  if (Object.keys(props.roles).filter(x => props.roles[x].email === props.email).length>0)
  {
    return (
      <div className='roles'>
        <h3>users</h3>
        <div className='role-labels'>        
          <label>Role</label>
          <label>email</label>
          <label>Name</label>
          <label>username</label>
          <label>signName</label>
          <label>Action</label>
        </div>
        {
          Object.keys(props.roles).map(x =>         
            <div className='single-role' key={x}>
              
                <label>Role:
                {props.roles[x].admin?` admin`:` author`}  
                </label>
              <label>{props.roles[x].email || ''} </label>
              <label>{props.roles[x].displayName||''} </label>
              <label>{props.roles[x].username}</label>
              <label>{props.roles[x].signName}</label>
              {props.roles[x].email }
              <label><Link to={`/app/users/${x}`} >--></Link></label>
              </div>
          )}
        {
          //console.log(Object.keys(props))
          //console.log(props.roles)
        }
      </div>
    )
  } else return(
    <div>
      <p>unauthorized user</p>
    </div>
  )
}

export default Roles
