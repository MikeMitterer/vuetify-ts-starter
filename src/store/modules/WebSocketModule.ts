import { WebSocketStore, webSocketStore } from '@/store/interfaces/WebSocketStore'
import { getWebSocketServe } from '@/store/utils/WebSocketServer'
import { LoggerFactory, LogLevel } from '@mmit/logging'

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import store from '../index'

@Module({ namespaced: true, name: webSocketStore.NAME, store })
export default class WebSocketModule extends VuexModule implements WebSocketStore {
    private readonly logger = LoggerFactory.for('vuetify-ts-starter.store.modules.WebSocket')
        .level(LogLevel.INFO)
        .get()

    public isConnected: boolean = false

    // - Actions -----------------------------------------------------------------------------------

    /**
     * Init wird durch den Create-Hook in  App.vue angestoßen
     *
     * action 'init' commits mutation '_init' when done
     */
    @Action({ commit: '_init' })
    public async init(): Promise<void> {
        const webSocketUrl = getWebSocketServe().url

        this.logger.info('WebSocketModule initializing...', webSocketUrl)

        // const webSocketService = createWebSocket({ url: webSocketUrl})
        // const connection = new Connection(sysInfo.server.host, sysInfo.server.port, {
        //     scheme:
        //         sysInfo.server.protocol === 'http' || sysInfo.server.protocol === 'ws'
        //             ? 'http'
        //             : 'https'
        // })
        // const actionBus = ActionBus.getInstance()
        // const logErrorMessage = (e: unknown) => {
        //     this.logger.error(
        //         `Failed to connect to ${sysInfo.server.baseUrl} with ${(e as Error).message}`!
        //     )
        // }
        //
        // const autoReconnect = prepareAutoConnection(
        //     connection,
        //     webSocketService,
        //     sysInfo.server.baseUrl
        // )
        //
        // webSocketService.onJson = (eventName, event): void => {
        //     this.logger.info(`JSON-Payload: `, event)
        //     actionBus.fire(event)
        // }
        //
        // webSocketService.onMessage = (message): void => {
        //     this.logger.info(`Message-Payload: `, message)
        // }
        //
        // webSocketService.onOpen = (): void => {
        //     this.logger.info(`Connected to ${sysInfo.server.wsUrl}...`)
        //
        //     this.connectionState('connected')
        //     actionBus.fire(new ApplicationConnectedAction())
        // }
        // webSocketService.onClose = (): void => {
        //     this.logger.warn(`Connection to ${sysInfo.server.wsUrl} closed by server!`)
        //
        //     this.connectionState('disconnected')
        //     actionBus.fire(new ApplicationDisConnectedAction())
        //     autoReconnect(logErrorMessage)
        // }
        //
        // autoReconnect(logErrorMessage)
        // if (await connection.isAvailable()) {
        //     await webSocketService.connect()
        // }
    }

    @Action({ commit: '_connectionState' })
    private async connectionState(state: 'connected' | 'disconnected'): Promise<boolean> {
        return state === 'connected'
    }

    // - Keep all the Mutations private - we don't want to call Mutations directly -----------------

    @Mutation
    private _init(_: unknown): void {
        this.logger.debug('WebSocketModule initialized!')
    }

    @Mutation
    private _connectionState(payload: boolean): void {
        this.isConnected = payload
    }
}
