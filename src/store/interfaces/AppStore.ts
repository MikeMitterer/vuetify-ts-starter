export const appStore: { readonly NAME: string } = {
    // Name muss immer gleich sein wie der Name des Moduls
    NAME: 'appModule'
}

export interface AppStore {
    init(): Promise<void>
}
