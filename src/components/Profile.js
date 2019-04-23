import React from "react"

const Profile = (props) => (
    <div className='app-profile'>
        <p>Profile component</p>
        {Object.keys(props.userposts).map(x => 
        <div key={x}>
            <p>{x}</p>  
        </div>      
            
            )}
    </div>
)

export default Profile