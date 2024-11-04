'use client'

import React, { FC, useState } from 'react';
import { Input } from '@nextui-org/input';
import { Icon } from '@iconify/react/dist/iconify.js';
import { FormInputProps } from '@/types';

const FormInput: FC<FormInputProps> = ({ endContentIcon, type, label, name, onChange, defaultValue, onBlur, maxLength, value, isDisabled, isInvalid, errorMessage }) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            className={`w-full my-2 ${isInvalid && isInvalid && 'animate-shake'}`}
            type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            defaultValue={defaultValue}
            onBlur={onBlur}
            isDisabled={isDisabled}
            isInvalid={isInvalid ? isInvalid : false}
            errorMessage={errorMessage}
            endContent={
                type === 'password'
                ?
                (
                    isVisible ?
                    <Icon
                        icon={"mingcute:unlock-line"}
                        onClick={() => toggleVisibility()}
                        className={`w-4 h-4 opacity-7 cursor-pointer`}
                    />
                    :
                    <Icon
                        icon={endContentIcon!}
                        onClick={() => toggleVisibility()}
                        className={`w-4 h-4 opacity-7 cursor-pointer`}
                    />
                )
                :
                <Icon
                    icon={endContentIcon!}
                    className={`w-4 h-4 opacity-7 cursor-pointer`}
                />
            }
        />
    );
}

export default FormInput;