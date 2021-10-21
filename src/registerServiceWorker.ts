/* tslint:disable */
/* eslint-disable no-console */

import { Workbox } from 'workbox-window'

const isProductionMode = process.env.NODE_ENV === 'production'
const isDevMode = !isProductionMode

interface ServiceWorkerMessage {
    message: string;
}

const isAppInPWAMode = process.env?.VUE_APP_USE_PWA_MODE === "True"
console.info(`Application is ${isAppInPWAMode ? '' : 'NOT! '}in PWAMode`)

// process.env.BASE_URL = /
// console.log(`${process.env.BASE_URL}`)
export const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

export const isServiceWorkerSupported: () => boolean = () => ('serviceWorker' in navigator)

export const registerServiceWorker = (): void => {
    if (isServiceWorkerSupported() && isAppInPWAMode) {
        wb.register()
            .then(() => {
                console.log('Service Worker registration completed')
            })
            .catch((err) => {
                console.error('Service Worker registration failed:', err)
            })
    }
}

export const sendMessageToServiceWorker = (message: ServiceWorkerMessage): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        wb.messageSW(message).then((event: MessageEvent): void => {
            if (event.data) {
                if (event.data.error) {
                    reject(event.data.error)
                } else {
                    resolve(event.data)
                }
            }
        })
    })
}



