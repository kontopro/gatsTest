import React, {useState, useEffect} from "react";


function Profile(props) {

    const [posts, setPosts] = useState(props.posts)
    const [userposts, setUserposts] = useState(props.userposts)
    useEffect(() => {
        setPosts(props.posts)
        setUserposts(props.userposts)
    },[props])
    if (props.posts){
    return(
    <div className='app-profile'>
        <p>Profile component</p>
        <div className='app-profile-create-post'>
            <p>Create new post</p>
            <button>new post</button>
        </div>
        {Object.keys(userposts).map(x => 
        <div key={x} className='app-profile-postcard global-smooth-card'>
            <img alt='title' width='250' src={`${posts[x].fimage}`}/>
            <p>{posts[x].title}</p>
            <button>Edit</button> 
            <button>Delete</button> 
        </div>
            )}
    </div>
)}else{return (<div><p>loading...</p></div>)}
}
export default Profile