import React from 'react'
import links from '../utils/links'
import {NavLink} from 'react-router-dom'

export default function NavLinks({toggleSidebar}) {
  return (
    <div className="nav-links">
        {links.map((link)=>{
            return(
            <NavLink 
            to={link.path} 
            key={link.id} 
            className={({isActive})=> (isActive ? "nav-link active" : "nav-link")} // *** {isActive} is a backed feature in react-router <navLink>
            onClick={toggleSidebar}>
                <span className="icon">{link.icon}</span>
                {link.text}
            </NavLink>
            )
        })}
        
    </div>
  )
}
