import React from 'react'
import {Outlet} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
  return <>
  
  <Navbar  style={{ marginTop: '80px', height: '2000px', background: 'linear-gradient(black, #111)' }}/>
  <Outlet></Outlet>
  <Footer/>
  </>
}
