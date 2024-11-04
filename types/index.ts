import { IconifyIcon } from "@iconify/react/dist/iconify.js"
import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, MouseEventHandler } from "react"

export interface FormInputProps {
    endContentIcon?: string | IconifyIcon
    type?: HTMLInputTypeAttribute
    label?: string
    name?: string
    onChange?: ChangeEventHandler
    onBlur?: FocusEventHandler
    maxLength?: number
    value?: string
    isDisabled?: boolean
    isInvalid?: boolean
    errorMessage?: string
    defaultValue?: string
}

export interface MainButtonProps {
    type?: "button" | "reset" | "submit"
    onClick?: MouseEventHandler
    isDisabled?: boolean
    name: string | React.ReactNode | React.JSX.Element | React.JSX.Element[]
    isLoading?: boolean
    variant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "ghost"
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
    isIconOnly?: boolean
}

export interface LoaderProps {
    bodyStyle?: string
    width?: number | `${number}`
    height?: number | `${number}`
}