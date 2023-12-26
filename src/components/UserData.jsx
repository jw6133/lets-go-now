import React, { useEffect, useState } from 'react'

function UserData({user}) {

    return (
        <img className="user-img" src={user.photoURL} alt={user.displayName}/>
    )
}

export default UserData
