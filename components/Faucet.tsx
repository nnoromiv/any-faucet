"use client"

import { AddressSchema } from '@/Schema'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import FormInput from './FormInput'
import { ethersConfig, toSentenceCase } from '@/utils'
import { Loader, MainButton } from "@/components"
import { toast } from 'sonner'
import { useAccount, useReadContract, useConnect } from 'wagmi'
import abi from '@/contracts/abi.json'
import { formatEther } from 'ethers'
import { ConnectorNotConnectedError, writeContract, WriteContractErrorType, type WriteContractReturnType } from '@wagmi/core'
import { parseGwei } from 'viem'
import { polygon } from 'wagmi/chains'

const Faucet = () => {
    const [loader, setLoader] = useState(false)
    const { address: connectedAddress } = useAccount()
    const { connectAsync, connectors } = useConnect({
        config: ethersConfig,
    })

    const { data: amount, isError, isLoading, error}  = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_ADDRESS!}`,
        abi,
        functionName: 'amountToDistribute'
    })

    if(isError){
        toast.error(`Contract not installed`)
        console.log(error)
    }

    const handleRequestToken = async (address: string) => {

        if(!address){
            toast.error("No address detected")
            return
        }

        if(!connectedAddress){
            toast.info("No Wallet is connected: Continuing is risky")
            return
        }

        if(connectedAddress !== address){
            toast.warning("Your are authorizing token for a different account")
        }

        let result : WriteContractReturnType | WriteContractErrorType;

        try {

            setLoader(true)

            result = await writeContract(ethersConfig, {
                abi, 
                address: `0x${process.env.NEXT_PUBLIC_ADDRESS!}`,
                account: connectedAddress,
                gas: parseGwei('0.0001'),
                functionName: 'requestTokens',
                chainId: polygon.id
            })

            toast.success(`Success: ${result}`)

        } catch (error) {
            const err = error as unknown as WriteContractErrorType
            toast.error(`${err.name} : ${err.message.split("Contract Call:")[0].trim()}`)
        } finally {
            setLoader(false)
        }
    }

    return (
        isLoading ?
            <Loader />
        :
        <div className='relative z-10'>
            <h1 className='text-white font-bold text-3xl dark:text-base-200 max-[768px]:text-2xl'>Get {formatEther(amount as number)} Any Token</h1>
            <p className='text-white text-sm'>This faucet transfers Tokens. Please confirm details before submitting</p>

            <Formik
                initialValues={{
                    address: ''
                }}
                onSubmit={i => console.log(i)}
                validationSchema={AddressSchema}
                validateOnChange
            >
                {({ errors, values, touched, dirty, isValid }) => (
                    <>
                        <Form className='w-full'>
                            <FormInput
                                label='*Address'
                                endContentIcon={"token-branded:polygon-pos"}
                                type='text'
                                isDisabled
                                name='address'
                                value={connectedAddress ? connectedAddress : ''}
                                isInvalid={touched.address && errors.address ? true : false}
                                errorMessage={touched.address && errors.address ? toSentenceCase(errors.address) : ''}
                            />

                            <MainButton
                                name='Request Token'
                                isLoading={loader}
                                type='submit'
                                isDisabled={loader}
                                onClick={() => handleRequestToken(connectedAddress!)}
                            />

                        </Form>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default Faucet