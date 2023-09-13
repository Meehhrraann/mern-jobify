import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import {Logo} from '../components/index'
import NavLinks from './NavLinks'

const SmallSidebar = () => {
  const {showSidebar, toggleSidebar} = useAppContext()
  console.log(showSidebar);

  return (
    <Wrapper>

        <div className={showSidebar ? "sidebar-container show-sidebar" : 'sidebar-container'}>
            <div className="content">
              <button type="button" className="close-btn" onClick={toggleSidebar}><FaTimes/></button>
              <header><Logo /></header>
              <NavLinks toggleSidebar={toggleSidebar}/>
            </div>
        </div>
        
    </Wrapper>
  )
}

export default SmallSidebar