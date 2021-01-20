declare class TrackedReference<T> {
    protected callbackStack: Array<{
        id: number;
        callback: (refVal: T, reomve?: () => void) => void;
    }>;
    protected reference: any;
    protected lastId: number;
    constructor(ref: any);
    addListener(callback: (refVal: T, remove?: () => void) => void): number;
    removeListener(id: number): void;
    get current(): T;
    set current(newVal: T);
}
export declare function useTrackedRef<T>(val: T): TrackedReference<T>;
export {};
