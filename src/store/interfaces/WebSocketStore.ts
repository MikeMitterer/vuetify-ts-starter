export const webSocketStore: { readonly NAME: string } = {
    // Name muss immer gleich sein wie der Name des Moduls
    NAME: 'webSocketModule'
}

export interface WebSocketStore {
    readonly isConnected: boolean

    init(): Promise<void>
}
