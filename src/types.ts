import { ITextConfig } from 'data/types'

export enum Locale {
    En = 'en',
    Ru = 'ru',
}

interface InfraConfiguration {
    element?: HTMLElement
}

export interface IThemeColors {
    background?: string
    button?: string
    text?: string
}

export interface IWidgetConfiguration {
    locale: Locale
    debug: boolean
    texts: ITextConfig

    classNames?: {
        root?: string
        title?: string
        description?: string
        button?: string
    }
    themeColors?: IThemeColors
}

export type Configurations = IWidgetConfiguration & InfraConfiguration
