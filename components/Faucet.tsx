"use client"

import { AddressSchema } from '@/Schema'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import FormInput from './FormInput'
import { ethersConfig, toSentenceCase } from '@/utils'
import { Loader, MainButton } from "@/components"
import { toast } from 'sonner'
import { useAccount, useReadContract } from 'wagmi'
import abi from '@/contracts/abi.json'
import polAbi from '@/contracts/pol_abi.json'
import { formatEther } from 'ethers'
import { writeContract, WriteContractErrorType, type WriteContractReturnType } from '@wagmi/core'
import { parseGwei } from 'viem'
import { polygon } from 'wagmi/chains'

const Faucet = () => {
    const [loader, setLoader] = useState(false)
    const [polLoader, setPolLoader] = useState(false)


    const { address: connectedAddress } = useAccount()

    const { data: amount, isError, isLoading, error } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_ADDRESS!}`,
        abi,
        functionName: 'amountToDistribute'
    })

    const { data: polAmount, isError: polIsError, isLoading: polIsLoading, error: polError } = useReadContract({
        address: `0x${process.env.NEXT_PUBLIC_POL_DOGE!}`,
        abi: polAbi,
        functionName: 'amountToDistribute'
    })


    if (isError || polIsError) {
        toast.error(`Contract not installed`)
        console.log(error, polError)
    }

    const handleRequestToken = async (address: string) => {

        if (!address) {
            toast.error("No address detected")
            return
        }

        if (!connectedAddress) {
            toast.info("No Wallet is connected: Continuing is risky")
            return
        }

        if (connectedAddress !== address) {
            toast.warning("Your are authorizing token for a different account")
        }

        let result: WriteContractReturnType | WriteContractErrorType;

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

    const handleRequestPolDoge = async (address: string) => {

        if (!address) {
            toast.error("No address detected")
            return
        }

        if (!connectedAddress) {
            toast.info("No Wallet is connected: Continuing is risky")
            return
        }

        if (connectedAddress !== address) {
            toast.warning("Your are authorizing token for a different account")
        }

        let result: WriteContractReturnType | WriteContractErrorType;

        try {

            setPolLoader(true)

            result = await writeContract(ethersConfig, {
                abi: polAbi,
                address: `0x${process.env.NEXT_PUBLIC_POL_DOGE!}`,
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
            setPolLoader(false)
        }
    }
    return (
        (isLoading || polIsLoading) ?
            <Loader />
            :
            <div className='relative z-10'>
                <h1 className='text-white font-bold text-3xl dark:text-base-200 max-[768px]:text-2xl'>Get {formatEther(amount as number)} Any Token and {formatEther(polAmount as number)} PolDoge</h1>
                <p className='text-white text-sm'>This faucet transfers Tokens. Please confirm details before submitting</p>

                <Formik
                    initialValues={{
                        address: ''
                    }}
                    onSubmit={i => console.log(i)}
                    validationSchema={AddressSchema}
                    validateOnChange
                >
                    {({ errors, touched }) => (
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

                                <div className='w-full flex flex-row justify-between gap-5'>
                                    <MainButton
                                        name='Request Any Token'
                                        isLoading={loader}
                                        type='submit'
                                        isDisabled={loader}
                                        onClick={() => handleRequestToken(connectedAddress!)}
                                    />
                                    
                                    <MainButton
                                        name='Request PolDoge'
                                        isLoading={polLoader}
                                        type='submit'
                                        isDisabled={polLoader}
                                        variant='bordered'
                                        onClick={() => handleRequestPolDoge(connectedAddress!)}
                                    />
                                </div>

                            </Form>
                        </>
                    )}
                </Formik>
            </div>
    )
}

export default Faucet