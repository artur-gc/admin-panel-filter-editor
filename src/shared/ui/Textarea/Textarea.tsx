import { ChangeEvent, TextareaHTMLAttributes, useRef } from "react"
import styles from "./Textarea.module.scss"
import { Typography } from "../Typography/Typography"
import { classNames } from "../../lib/classNames/classNames"
import { getRandomId } from "../../lib/getRandndomId/getRandomId"

type HtmlTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">

interface ITextareaProps extends HtmlTextareaProps {
    value: string
    label?: string
    placeholder?: string
    onChange: (value: string) => void
    error?: string
    className?: string
    noLimit?: boolean
}

export function Textarea(props: ITextareaProps) {
    const { className, onChange, value, label, placeholder, error, noLimit, ...otherProps } = props
    const textareaIdRef = useRef(getRandomId("textarea"))

    function changeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(styles.container, { [styles.incorrect]: error }, [className])}>
            <label htmlFor={textareaIdRef.current} className={styles.label}>
                {label}
            </label>
            <textarea
                value={value}
                onChange={changeHandler}
                id={textareaIdRef.current}
                className={styles.textarea}
                placeholder={placeholder}
                rows={10}
                maxLength={10000}
                {...otherProps}
            />
            {!noLimit && (
                <Typography className={styles.counter} color="secondary" size="xs">
                    Character limit: {1000 - value.length}
                </Typography>
            )}
            {!!error && <p className={styles.error}>{error}</p>}
        </div>
    )
}
