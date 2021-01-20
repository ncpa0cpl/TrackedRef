import { useRef } from "react";

class TrackedReference<T> {
  protected callbackStack: Array<{
    id: number;
    callback: (refVal: T, reomve?: () => void) => void;
  }> = [];
  protected reference: any;
  protected lastId: number = 0;

  constructor(ref: any) {
    this.reference = ref;
  }

  addListener(callback: (refVal: T, remove?: () => void) => void) {
    const id = this.lastId++;
    this.callbackStack.push({
      id: id,
      callback: callback,
    });
    return id;
  }

  removeListener(id: number) {
    this.callbackStack = this.callbackStack.filter((entry) => entry.id !== id);
  }

  get current(): T {
    return this.reference;
  }

  set current(newVal: T) {
    if (newVal !== this.current) {
      this.reference = newVal;
      for (const c of this.callbackStack) {
        c.callback(newVal, () => {
          this.removeListener(c.id);
        });
      }
    }
  }
}

export function useTrackedRef<T>(val: T) {
  const tf = useRef<TrackedReference<T>>(new TrackedReference(val));
  return tf.current;
}
