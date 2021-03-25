export interface CounterStore {
    count: number

    init(): Promise<void>

    increment(delta: number): Promise<number>

    decrement(delta: number): Promise<number>
}
