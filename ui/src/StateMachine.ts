export type State = string | number | symbol;

export type StateTransitions<S extends State> = Record<S, Array<S>>

export type StateStore<S extends State> = {
  currentState: S
};

export type StateTransitionCallback<S extends State> = (_: StateStore<S>) => Promise<void>

export type Callbacks<S extends State> = Record<S, StateTransitionCallback<S>>;

/**
 * The main mechanism for maintaining app loading state
 */
export class StateMachine<S extends State, T extends StateStore<S>> {
  state: T
  transitions: StateTransitions<S>
  callbacks: Callbacks<State>

  constructor(init: T, transitions: StateTransitions<S>) {
    this.state = init;
    this.transitions = transitions
  }

  public to(state: S) {
    if (
      this.transitions[this.state.currentState].findIndex(
        (nState) => state == nState
      ) >= 0
    ) {
      this.state.currentState = state
      this.go()
    } else {
      const currState = this.state.currentState
      throw new Error(
        `Could not set state to ${String(state)} while at current state ${String(currState)}.`
      )
    }
  }

  public on(
    state: S,
    callback: StateTransitionCallback<S>
  ): void {
    if (!this.callbacks) {
      this.callbacks = {} as Callbacks<S>
    }
    this.callbacks[state] = callback
  }

  public go() {
    setTimeout(() => {
      const currState = this.state.currentState
      this.callbacks[currState](this.state)
    })
  }
}
