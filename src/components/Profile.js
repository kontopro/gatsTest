import React from "react"

const Profile = (props) => (
    <div className='app-profile'>
        <p>Profile component</p>
        <div className='app-profile-create-post'>
            <p>Create new post</p>
            <button>new post</button>
        </div>
        {Object.keys(props.userposts[props.uid]).map(x => 
        <div key={x} className='app-profile-postcard global-smooth-card'>
            <img alt='title' width='250' src={`${props.posts[x].fimage}`}/>
            <p>{props.posts[x].title}</p>
            <button>Edit</button> 
            <button>Delete</button> 
        </div>
            )}
    </div>
)

export default Profile