import React from 'react'
import { firebaseSignOut } from "../utilities/firebase";;

export const SignOutButton = () => {
  return (
    <button className='btn btn-secondary btn-sm m-1' onClick={() => firebaseSignOut()}>
        Sign out
    </button>
  )
}

