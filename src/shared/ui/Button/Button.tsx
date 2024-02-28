import { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./Button.module.scss"
import { classNames } from "../../lib/classNames/classNames"

export type TButtonVariant =
    | "primary"
    | "secondary"
    | "clear"
    | "primaryOutlined"
    | "secondaryOutlined"

type TButtonColor = "purple" | "blue" | "approve" | "red" | "updatePurple" | "white"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean
    isDisabledDark?: boolean
    variant?: TButtonVariant
    color?: TButtonColor
    children: ReactNode
    className?: string
}

export function Button(props: IButtonProps) {
    const {
        children,
        variant = "primary",
        color = "blue",
        className,
        isDisabled = false,
        isDisabledDark = false,
        ...otherProps
    } = props

    return (
        <button
            className={classNames(
                styles.btn,
                { [styles.disabled]: isDisabled, [styles.disabledDark]: isDisabledDark },
                [className, styles[variant], styles[color]]
            )}
            {...otherProps}
        >
            {children}
        </button>
    )
}
