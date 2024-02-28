import { HTMLAttributes, ReactNode } from "react"
import styles from "./Typography.module.scss"
import { classNames } from "../../lib/classNames/classNames"

type TTypographySize = "xs" | "s" | "m" | "fs-18" | "l" | "xl" | "xxl"
type TTypographyColor = "primary" | "secondary" | "inverted" | "invertedGray"
type TTypographyWeight = "light" | "regular" | "medium" | "semi-bold" | "bold"

export interface ITypographyProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: TTypographySize
    color?: TTypographyColor
    weight?: TTypographyWeight
    children: ReactNode
    className?: string
}

export function Typography(props: ITypographyProps) {
    const {
        className,
        children,
        size = "m",
        color = "primary",
        weight = "regular",
        ...otherProps
    } = props
    return (
        <p
            className={classNames(styles.text, {}, [
                className,
                styles[size],
                styles[color],
                styles[weight],
            ])}
            {...otherProps}
        >
            {children}
        </p>
    )
}
