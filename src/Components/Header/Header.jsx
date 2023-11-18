import React, { useEffect } from 'react'
import "./Header.css"
import {auth} from "../../firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import {toast} from 'react-toastify'
import { CgProfile } from "react-icons/cg";


const Header = () => {
  const [user, loading] = useAuthState(auth); 
  const navigate = useNavigate();

  useEffect(()=>{
    if(user)
    {
      navigate("/dashboard")
    }
  },[user,loading])

   
  
  function logout(){
    signOut(auth).then(() => {
      toast.success("Logged out!")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message);
    });
   }

  return (
    <div className='navbar'>
      <h4 className='logo'>Financely</h4>
      {
        user && (
          <div className='profile-pic'>
            {
              user.photoURL ? <img src={user.photoURL} /> : <CgProfile className='icon'/>
            }
            <p className='logout' onClick={logout}>Logout</p>
          </div>
        )
      }
    </div>
  )
}

export default Header