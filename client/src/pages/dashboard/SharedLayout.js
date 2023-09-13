import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout' 
import { Navbar, BigSidebar, SmallSidebar } from '../../components/index'

export default function SharedLayout() {
  return (
    <Wrapper>
        <main className="dashboard">
            <SmallSidebar/>
            <BigSidebar/>
            <div>
                <Navbar/>
                <div className="dashboard-page">

        <Outlet/> {/* don't render this component again (navbar) && render all children routes (pages contents)*/}
                </div>
            </div>
        </main>
    </Wrapper>
  )
}
