import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <Link to="/">
      <p className='font-bold text-gradient text-2xl'>ResumeAnalyzer</p>
      </Link>
      <Link to="/upload" className='primary-button w-fit'>
        upload resume
      </Link>
    </nav>
  )
}

export default NavBar