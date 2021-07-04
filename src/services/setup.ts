import { ITexts } from 'data/types'
import { Configurations, IWidgetConfiguration } from '../types'

enum MethodName {
    Init = 'init',
    Event = 'event',
}

interface LoaderObject {
    q: Array<[MethodName, {}]>
}

export const DEFAULT_WIDGET_NAME = 'fw'

export class SetupService {
    private readonly config: Configurations
    private readonly texts: ITexts
    private readonly scriptElement: Element | null
    private readonly renderWidget: (
        target: Element,
        options: IWidgetConfiguration
    ) => void

    constructor(
        config: Configurations,
        texts: ITexts,
        renderWidget: (target: Element, options: IWidgetConfiguration) => void
    ) {
        this.scriptElement = window.document.currentScript

        this.config = config
        this.texts = texts
        this.renderWidget = renderWidget
    }

    public init() {
        const instanceName =
            this.scriptElement?.attributes.getNamedItem('id')?.value ??
            DEFAULT_WIDGET_NAME
        const loaderObject: LoaderObject = window[instanceName]

        if (!loaderObject || !loaderObject.q) {
            throw Error(
                `Widget didn't find LoaderObject for instance [${instanceName}]`
            )
        }

        if (window[`loaded-${instanceName}`]) {
            throw Error(
                `Widget with name [${instanceName}] was already loaded.`
            )
        }

        let targetElement: HTMLElement

        loaderObject.q.forEach(([methodName, methodOptions], index) => {
            if (index === 0 && methodName !== MethodName.Init) {
                throw Error(
                    `Failed to start Widget [${instanceName}]. 'init' must be called before other methods.`
                )
            }
            if (index !== 0 && methodName === MethodName.Init) {
                return
            }

            switch (methodName) {
                case MethodName.Init: {
                    const loadedObject = { ...this.config, ...methodOptions }
                    loadedObject.texts = this.texts[loadedObject.locale]

                    if (loadedObject.debug) {
                        console.log(
                            `Starting widget [${instanceName}]`,
                            loadedObject
                        )
                    }

                    const wrappingElement =
                        loadedObject.element ?? window.document.body
                    targetElement = wrappingElement.appendChild(
                        window.document.createElement('div')
                    )
                    targetElement.setAttribute('id', `widget-${instanceName}`)

                    this.renderWidget(targetElement, loadedObject)

                    window[`loaded-${instanceName}`] = true
                    break
                }

                default:
                    console.warn(
                        `Unsupported method [${methodName}]`,
                        methodOptions
                    )
            }
        })

        window[instanceName] = (method: MethodName, ...args: unknown[]) => {
            switch (method) {
                case MethodName.Event: {
                    targetElement?.dispatchEvent(
                        new CustomEvent('widget-event', {
                            detail: { name: args?.[0] },
                        })
                    )
                    break
                }

                default:
                    console.warn(`Unsupported method [${method}]`, args)
            }
        }
    }
}
