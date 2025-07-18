import React from 'react'
import '../styles/redirect.css'
import { Link } from 'react-router-dom'
const Redirect = () => {
  return (
    <div className='redirec'>
        <div className="red-cont">
        <div className="p">You need to login to add products in your card</div>
        <Link to={'/login'}>
        <button>Log In</button>
        </Link>
        </div>
    </div>
  )
}

export default Redirect