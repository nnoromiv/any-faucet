import { LOGO } from '@/images'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between relative z-10'>
        <Image
            alt='Logo'
            width={100}
            height={100}
            src={LOGO}
        />

        <ConnectButton />        
    </nav>
  )
}

export default NavBar