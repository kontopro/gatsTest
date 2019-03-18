import React from "react"

const Login = (props) => (
    <>
       <form className='sign-in'>
       <h4>να φτιάξω το button</h4>
        <button type='button' className='google' onClick={() => props.authenticate("Google")}>log in with google</button>
      </form> 
    </>
)

export default Login