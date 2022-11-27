import { SubscriberCallback } from './TreeStore';

/**
 * Implements a basic subscriber list and allows dispatching messages in a non-blocking way
 */
 export class SubscriberList extends Map<string, Array<SubscriberCallback>> {

  /**
   * Subscribe to changes on a particular path
   */
  public subscribe(callback: SubscriberCallback, path: string = 'root'): SubscriberCallback {
    if (this.has(path)) {
      const subscribers = this.get(path);
      /**
       * This used to check to see if the value was already present in the array,
       * however, that was causing issues with React. Perhaps certain memoized
       * callback functions all have the same identity? I'll have to look into
       * this more later. The important thing is that it works.
       */
      subscribers.push(callback);
    } else {
      this.set(path, [callback]);
    }
    // Get the index of the last instance of the callback that we just added and
    // use it to remove it when the unsubscribe callback is called.
    const subscribers = this.get(path);
    const index = subscribers.lastIndexOf(callback);
    const self = this;
    return () => {
      if (index > 0) {
        self.set(path, subscribers.splice(index, 1));
      }
    }
  }

  /**
   * Dispatch a change to the subscribers
   */
  public dispatch(path: string) {
    if (this.has(path)) {
      const subscribers = this.get(path);
      subscribers.forEach(
        (callback) => {
          setTimeout(() => callback(), 0);
        }
      )
    }
  }
}