import React from 'react'
import mainImage from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import Logo from '../components/Logo'
import { Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

export default function Landing() {
  const {user} =useAppContext()
  return (
    <React.Fragment>
    {user && <Navigate to='/'/>}  
    <Wrapper>

    <div>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            {/* info */}
            <div >
                <h1>job <span>tracking</span> app</h1>
                <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to='/register' className="btn btn-hero">Login / Register</Link>
            </div>
            

            <img src={mainImage} alt="mainImage" className="img main-img" />
        </div>
        
    </div>
    </Wrapper>
    </React.Fragment>
  )
}
