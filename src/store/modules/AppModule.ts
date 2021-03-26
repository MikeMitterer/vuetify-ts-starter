import { app } from '@/main'
import { appStore, AppStore } from '@/store/interfaces/AppStore'
import { LoggerFactory, LogLevel } from '@mmit/logging'

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import store from '../index'

@Module({ namespaced: true, name: appStore.NAME, store })
export default class AppModule extends VuexModule implements AppStore {
    private readonly logger = LoggerFactory.for('vuetify-ts-starter.store.modules.AppModule')
        .level(LogLevel.INFO)
        .get()

    // - Actions -----------------------------------------------------------------------------------

    /**
     * Init wird durch den Create-Hook in  App.vue angestoßen
     *
     * action 'init' commits mutation '_init' when done
     */
    @Action({ commit: '_init' })
    public async init(): Promise<void> {
        this.logger.info('AppModule initializing...')

        app.$on('event', (payload: unknown) => {
            this.logger.info('Received:', payload)
        })
    }


    // - Keep all the Mutations private - we don't want to call Mutations directly -----------------
    @Mutation
    private _init(_: unknown): void {
        this.logger.info('AppModule initialized!')
    }

}
