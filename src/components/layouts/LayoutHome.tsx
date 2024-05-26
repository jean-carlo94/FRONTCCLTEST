import React, { FC, ReactNode } from 'react'
import { Footer, Navbar } from '../home'

interface Props {
    children : ReactNode;
}

export const LayoutHome:FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-content">
      <header>
        <Navbar />
      </header>

      <main className="max-w-screen-xl m-auto px-2 md:px-10 mt-10">
        { children }
      </main>      
      <Footer />
    </div>
  )
}
