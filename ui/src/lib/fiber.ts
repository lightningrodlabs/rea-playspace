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
   * **Note:** Do not enclose any React state variables or function parameters
   * without first making a clone of the structures.
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



