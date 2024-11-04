"use client"

import { CopyToClipboard } from '@/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React from 'react'

const FAUCET = `0x${process.env.NEXT_PUBLIC_ADDRESS}`

const Footer = () => {
    return (
        <footer className='border-t-[2px] border-t-white mt-10 relative z-10 max-[426px]:mx-auto'>
            <div className='flex justify-evenly mt-5 text-white'>
                <Link href={'https://www.linkedin.com/in/nnorom'} 
                    target='_blank'>
                        <Icon icon={"mingcute:linkedin-line"} className='w-[50px] h-[50px] cursor-pointer relative'/>
                </Link>
                <Link href={'https://www.x.com/nnorom'} 
                    target='_blank'>
                        <Icon icon={"mingcute:social-x-line"} className='w-[50px] h-[50px] cursor-pointer relative'/>
                </Link>
                <Link href={'https://www.t.me/verdansk'} 
                    target='_blank'>
                        <Icon icon={"mingcute:telegram-line"} className='w-[50px] h-[50px] cursor-pointer relative'/>
                </Link>
            </div>
            <div className='mt-2 flex flex-col text-center'>
                    {
                        FAUCET !== undefined &&
                        <h1
                            onClick={() => CopyToClipboard(FAUCET)}
                        className='underline w-fit max-[376px]:w-full self-center cursor-pointer my-2 text-[10px] bg-monadBlue px-3 py-1 rounded-full text-white dark:bg-monadPurple dark:text-black'
                        >   {FAUCET}
                        </h1>
                    }
                <h4 className='text-white'> Copyright © 2024 Any Token</h4>
            </div>
        </footer>
    )
}

export default Footer