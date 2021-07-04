import { render, h } from 'preact'

import { SetupService } from 'services'
import texts from 'data/texts.json'
import Widget from 'layout/Main'

import { Locale, IWidgetConfiguration } from './types'

const defaultConfig = {
    locale: Locale.En,
    debug: false,
    texts: texts['en'],
    classNames: {},
    themeColors: {},
}

const renderFormWidget = (target: Element, config: IWidgetConfiguration) => {
    const App = <Widget config={config} />

    render(App, target)
}

const app = new SetupService(defaultConfig, texts, renderFormWidget)

app.init()
