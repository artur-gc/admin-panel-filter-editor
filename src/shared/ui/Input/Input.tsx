import { ChangeEvent, InputHTMLAttributes, useState } from "react"
import styles from "./Input.module.scss"
import { classNames } from "../../lib/classNames/classNames"

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">

type TInputType = "text" | "number" | "email" | "password" | "tel"
type TInputTheme = "dark" | "light"

export interface InputProps extends HtmlInputProps {
    type?: TInputType
    theme?: TInputTheme
    label?: string
    isRequired?: boolean
    isDisabled?: boolean
    className?: string
    error?: string
    errorAbsolute?: boolean
    value: string | number
    id?: string
    onChange: (value: string) => void
}

export function Input(props: InputProps) {
    const [isFocused, setIsFocused] = useState(false)
    const {
        type = "text",
        theme = "dark",
        label,
        isRequired = false,
        isDisabled = false,
        errorAbsolute,
        className,
        error,
        value,
        id,
        onChange,
        ...otherProps
    } = props

    const containerClassName = classNames(
        styles.container,
        { [styles.incorrect]: error, [styles.disabled]: isDisabled },
        [className, styles[theme]]
    )

    const errorClassName = classNames(styles.error, { [styles.errorAbsolute]: errorAbsolute })

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value)
    }

    function handleFocus() {
        setIsFocused(true)
    }

    function handleBlur() {
        setIsFocused(false)
    }

    return (
        <div className={containerClassName}>
            {label && (
                <label
                    htmlFor={id}
                    className={classNames(
                        styles.label,
                        {
                            [styles.focused]: isFocused || !!value,
                        },
                        []
                    )}
                >
                    {label}
                    {isRequired && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                id={id}
                onChange={changeHandler}
                value={value}
                type={type}
                className={styles.input}
                {...otherProps}
            />
            {!!error && <p className={errorClassName}>{error}</p>}
        </div>
    )
}
