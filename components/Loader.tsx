import { LOGO } from '@/images'
import { LoaderProps } from '@/types'
import Image from 'next/image'
import React, { FC } from 'react'

const Loader:FC<LoaderProps> = ({ width, height, bodyStyle }) => {
  return (
    <main className={`flex w-full bg-black items-center justify-center ${bodyStyle}`}>
        <span className="bg-black">
          <Image 
            width={
                width ? width : 100
            } 
            height={
                height ? height : 100
            } 
            alt='Logo' 
            className='animate-spinner-ease-spin' 
            src={LOGO}
            priority
          />
        </span>
    </main>
  )
}

export default Loader