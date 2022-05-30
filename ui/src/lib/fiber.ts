// Define the type signature of an Action: async function or Promise
export type Action = () => Promise<void>

/**
 * This is a simple mechanism to ensure that we execute async or promise
 * returning code in the order it was added to the queue.
 */
export class Fiber {

  /**
   * Define the "fiber" that we'll use. For a reminder: Process > Thread > Fiber
   */
  private actionFiber: Promise<void>;

  private actionQueue: Action[];

  /**
   * Create the first resolved promise from which we build
   */
  constructor() {
    this.actionFiber = Promise.resolve();
  }

  /**
   * This takes an array of Promises or async functions (thunks) and ensures they
   * are executed in sequential fashion over the lifetime of this fiber.
   *
   * **Note:** While using React before v17, do not enclose any React state
   * variables or function parameters without first making a clone of the
   * structures or calling SyntheticEvent.persist() if you prefer not to clone.
   * It prevents the event model from returning the event object to the pool.
   *
   * For instance, if you are using the to asynchronously update a DB or
   * blockchain, you might find the object passed in as the parameter to into the
   * function has been changed and no longer reflects what you intended to save.
   * Most likely it will have undefined parameters. This is because in certain
   * events the specific object is reused and it's properties are cleared after
   * the event handler is done executing. That leaves you with a reference to an
   * empty object.
   *
   * See [https://reactjs.org/docs/legacy-event-pooling.html] for the official
   * take on this. This doesn't happen in React v17 and above.
   *
   * See [https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6] for
   * more in-depth examples and exmplantion of the SyntheticEvent pool object
   * reuse.
   */
  public schedule(actions: Array<Action>) {
    this.actionFiber = actions.reduce((chain: Promise<void>, curr) => chain.then(curr), this.actionFiber);
  }

  /**
   * Add thunks to the queue to be run in sequence once `run` is called. 
   * 
   * Same warning as above.
   */
  public scheduleDefered(actions: Array<Action>) {
    this.actionQueue.concat(actions);
  }

  /**
   * This executes the defered thunks.
   */
  public run() {
    this.schedule(this.actionQueue);
  }
}



