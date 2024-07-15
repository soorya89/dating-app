import React from 'react'
import Routers from '../routes/Routers'
import Header from '../component/Header/Header'

const Layout = () => {
  return (
    <>
      <main>
        <Header />
        <Routers />
      </main>
    </>
  )
}

export default Layout
