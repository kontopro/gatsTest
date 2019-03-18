import React from "react"

const Logout = (props) => (
    
       <form className='sign-in'>
       <button type='button' className='google' onClick={() => props.authenticate("Google")}>log in with google</button>
      </form> 
)

export default Logout