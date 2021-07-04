import { h, JSX } from 'preact'
import clsx from 'clsx'

import CalendarIcon from 'icons/Calendar.svg'

import styles from './DateField.css'

type Props = {
    name: string
    placeholder?: string
    className?: string
    onInput: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void
    value: string
}

export const DateField = ({ className, ...other }: Props) => {
    return (
        <div class={clsx(styles.root, className)}>
            <input class={styles.input} {...other} />
            <div class={styles.icon}>
                <CalendarIcon />
            </div>
        </div>
    )
}
