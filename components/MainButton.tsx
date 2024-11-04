'use client'

import { MainButtonProps } from '@/types'
import { Button } from '@nextui-org/button'
import React, { FC } from 'react'
import { Loader } from '@/components'

const MainButton: FC<MainButtonProps> = ({ type, isIconOnly, onClick, isDisabled, name, isLoading, variant, color }) => {
  return (
   <div className={isIconOnly ? 'w-fit cursor-pointer' : 'w-full'}>
     <Button 
        type={!type ? "button" : type}
        onClick={onClick}
        isDisabled={isDisabled}
        isLoading={isLoading}
        variant={variant}
        isIconOnly={isIconOnly}
        color={color ? color : isLoading ? "default" : "primary"}
        spinner={
          <Loader
            width={50}
            height={50}
            bodyStyle='!w-full !h-full !bg-black'
          />
        }
        className={`text-black h-12 w-full dark:text-white ${isIconOnly ? 'p-0' : 'p-3'} ${isDisabled ? 'opacity-50' : 'opacity-100'} ${isLoading ? 'pointer-events-none' : 'cursor-pointer'}`}
        >
          {
            !isLoading && name
          }
    </Button>
   </div>
  )
}

export default MainButton