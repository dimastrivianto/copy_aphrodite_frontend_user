import React from 'react';
import { useSelector } from 'react-redux'
import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin';

export default function Header() {
  const username = useSelector(state => state.auth.username)

  const renderHeader = () =>{
    console.log(window.location.pathname)
    if (window.location.pathname === "/register") {
      return null
      } 

    if(username === ""){
      return(
        <HeaderBeforeLogin/>
      )
    }
    
    return(
    <HeaderAfterLogin/>
    )
  }

  return (
      renderHeader()
  )
}

