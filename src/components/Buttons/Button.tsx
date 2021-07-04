import { h, ComponentChildren } from 'preact'
import clsx from 'clsx'

import styles from './Button.css'

type Props = {
    type?: string
    children: ComponentChildren
    className?: string
}

export const Button = ({ children, className, type }: Props) => {
    return (
        <button class={clsx(styles.root, className)} type={type}>
            {children}
        </button>
    )
}
