import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import notFound from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <Wrapper className="full-page" >
        <div>
            <img src={notFound} alt="not-found" className="img" />
            <h3>Ohh! Page Not Found</h3>
            <p>we can't seem to find the page you are looking for</p>
            <Link to='/'>Back home</Link>
        </div>
    </Wrapper>
  )
}
