import React, { useEffect, useState } from 'react'

function UserData(user) {
    const aa=user;
    const [isUser,setIsUser]=useState(null);
    useEffect((user)=>{
        setIsUser(aa);
    },[])
    console.log(isUser)
    return (
        <>
        {/* <img className="user-img" src={isUser.photoURL} alt={isUser.displayName}/> */}
        
        </>
    )
}

export default UserData
