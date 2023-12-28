import React from 'react'

function UserData({user}) {
    console.log(user);
    return (
        <img className="user-img" src={user.photoURL} alt={user.displayName}/>
    )
}

export default UserData
