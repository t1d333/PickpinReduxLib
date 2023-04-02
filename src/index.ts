export type Action = {
  type: string;
  payload?: { [_: string]: any };
};

export type Reducer<State> = (state: State, action: Action) => State;

export class Store<State> {
  private state: State;
  private reducer: Reducer<State>;

  private subscribers: Function[];
  constructor(reducer: Reducer<State>, initialState: State) {
    this.reducer = reducer;
    this.subscribers = [];
    this.state = initialState;
  }

  public getState = (): State => {
    return this.state;
  };

  public dispatch = (action: Action) => {
    this.state = this.reducer(this.state, action);
    for (const sub of this.subscribers) {
      sub();
    }
  };

  public subscibe = (callback: Function) => {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  };
}
