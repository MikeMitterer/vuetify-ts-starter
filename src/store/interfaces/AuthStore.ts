export const authStore: { readonly NAME: string } = {
    // Name muss immer gleich sein wie der Name des Moduls
    NAME: 'authModule'
}

export interface Credential {
    username: string
    password: string
}

export interface AuthStore {
    isAuthenticated: boolean

    init(): Promise<void>

    login(payload: Credential): Promise<boolean>;
    logout(): Promise<boolean>;
}
