import { LoggerFactory } from '@mmit/logging'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {authStore, AuthStore, Credential} from "@/store/interfaces/AuthStore";



@Module({  namespaced: true, name: authStore.NAME })
export default class AuthModule extends VuexModule  implements AuthStore {
    private readonly logger = LoggerFactory.getLogger('vuetify-ts-starter.store.AuthModule')

    private readonly credentials: Credential[] = [{ username: 'guest4@shiro.at', password: 'guest123B?' }]

    // für DEMO-Zwecke immer auf TRUE!
    private _loggedIn = true

    public get isAuthenticated(): boolean {
        return this._loggedIn
    }

    // action 'init' commits mutation '_init' when done with return value as payload
    // Action kann nur EINEN Parameter haben - Payload!
    @Action({ commit: '_init' })
    public async init(payload?: undefined): Promise<void> {
        this.logger.debug(`Initializing AuthModule...`)
    }

    // action 'login' commits mutation '_login' when done with return value as payload
    // Action kann nur EINEN Parameter haben - Payload!
    @Action({ commit: '_login' })
    public async login(payload: Credential): Promise<boolean> {
        const found = this.credentials.find((credential) => {
            const isEqual = credential.username === payload.username && credential.password === payload.password
            return isEqual
        })

        return found !== undefined
    }

    // action 'logout' commits mutation '_logout' when done with return value as payload
    @Action({ commit: '_logout' })
    public async logout(): Promise<boolean> {
        return true
    }

    // - Keep all the Mutations private - we don't want to call Mutations directly -----------------
    @Mutation
    private _init(_: unknown): void {
        this.logger.info('AuthModule initialized!')
    }

    @Mutation
    private _login(success: boolean): void {
        this.logger.info(`Success! (${success})`)
        this._loggedIn = success
    }

    @Mutation
    private _logout(payload: boolean): void {
        this._loggedIn = false
    }
}

