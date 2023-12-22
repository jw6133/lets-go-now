import React from 'react'

function UserData(user) {
    return (
        <>
        <img className="user-img" src={user.user.photoURL} alt={user.user.displayName}/>
        <span>{user.user.displayName}</span>
        </>
    )
}

export default UserData
