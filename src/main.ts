export type Action = {
  type: string;
  payload?: { [_: string]: any };
}

export type Reducer<State> = (state: State, action: Action) => State;

export class Store<State> {
  private state: State;
  private reducer: Reducer<State>;

  private subscibers: Function[];
  constructor(reducer: Reducer<State>, initialState?: State) {
    this.reducer = reducer;
    this.subscibers = [];
    if (initialState) {
      this.state = initialState;
    }
  }

  public getState = (): State => {
    return this.state;
  };

  public dispatch = (action: Action) => {
    this.state = this.reducer(this.state, action);
    for (const sub of this.subscibers) {
      sub();
    }
  };

  public subscibe = (callback: Function) => {
    this.subscibers.push(callback);
    return () => {
      this.subscibers = this.subscibers.filter((sub) => sub !== callback);
    };
  };
}
