import { AppStore } from '@/store/interfaces/AppStore'
import { CounterStore } from '@/store/interfaces/CounterStore'
import { WebSocketStore } from '@/store/interfaces/WebSocketStore'
import AuthModule from "@/store/modules/AuthModule";
import {AuthStore} from "@/store/interfaces/AuthStore";

type StoreProvider<T> = () => T

export interface RootState {
    loaded: boolean

    counterStore: StoreProvider<CounterStore>

    webSocketStore: StoreProvider<WebSocketStore>
    
    appStore: StoreProvider<AppStore>

    authStore: StoreProvider<AuthStore>
}
