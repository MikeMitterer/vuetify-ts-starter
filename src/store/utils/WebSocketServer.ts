export interface WebSocketServer {
    protocol: string
    host: string
    port: number
    endpoint: string

    url: string
}

export function getWebSocketServe(): WebSocketServer {
    const _throw = (error: string): never => {
        throw new Error(error)
    }

    const server: Omit<WebSocketServer, 'url'> = {

        protocol:
            process.env.VUE_APP_WS_SERVER_PROTOCOL ??
            _throw('process.env.VUE_APP_WS_SERVER_PROTOCOL not defined!'),
        host:
            process.env.VUE_APP_WS_SERVER_HOST ??
            _throw('process.env.VUE_APP_WS_SERVER_HOST not defined!'),
        port:
            process.env.VUE_APP_WS_SERVER_PORT !== undefined
                ? parseInt(process.env.VUE_APP_WS_SERVER_PORT, 10)
                : 0,
        endpoint:
            process.env.VUE_APP_WS_SERVER_ENDPOINT ??
            _throw('process.env.VUE_APP_WS_SERVER_ENDPOINT not defined!'),

    }

    return {
        url: `${server.protocol}://${server.host}:${server.port}${server.endpoint}`, ...server
    }
}
