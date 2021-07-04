import { h, JSX } from 'preact'
import { useState, useCallback, useRef, useEffect, useMemo } from 'preact/hooks'
import clsx from 'clsx'

import { DateField } from 'components/Fields'
import { Button } from 'components/Buttons'

import { IWidgetConfiguration } from '../types'

import styles from './main.css'

interface IFormValues {
    departDate: string
    returnDate: string
}

type Props = {
    config: IWidgetConfiguration
}

const cssVarByThemeColor = {
    background: '--color-background',
    font: '--color-font',
    button: '--color-button',
}

const Widget = ({
    config: { texts, classNames = {}, themeColors = {} },
}: Props) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const initialFormValues = useMemo(
        () => ({
            departDate: '',
            returnDate: '',
        }),
        []
    )

    const [formData, setFormData] = useState<IFormValues>(initialFormValues)

    useEffect(() => {
        if (rootRef.current) {
            Object.keys(themeColors).forEach(color => {
                if (cssVarByThemeColor[color]) {
                    rootRef.current?.style.setProperty(
                        cssVarByThemeColor[color],
                        themeColors[color]
                    )
                }
            })
        }
    }, [])

    const handleSubmit = useCallback(
        (e: Event) => {
            e.preventDefault()
            console.log('submit form...', formData)
            setFormData(initialFormValues)
        },
        [formData]
    )

    const handleChange = useCallback(
        (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
            const { name, value } = e?.currentTarget

            setFormData(prev => ({ ...prev, [name]: value }))
        },
        [setFormData]
    )

    return (
        <div ref={rootRef} class={clsx(styles.root, classNames.root)}>
            <div>
                <h1 class={clsx(styles.title, classNames.title)}>
                    {texts.title}
                </h1>
            </div>

            <div class={styles.content}>
                <p class={clsx(styles.description, classNames.description)}>
                    {texts.description}
                </p>

                <form class={styles.form} onSubmit={handleSubmit}>
                    <div class={styles.fields}>
                        <DateField
                            name="departDate"
                            className={styles.field}
                            placeholder={texts.departDate}
                            onInput={handleChange}
                            value={formData.departDate}
                        />
                        <DateField
                            name="returnDate"
                            className={styles.field}
                            placeholder={texts.returnDate}
                            onInput={handleChange}
                            value={formData.returnDate}
                        />
                    </div>

                    <div class={clsx(styles.button, classNames.button)}>
                        <Button type="submit">{texts.searchButton}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Widget
