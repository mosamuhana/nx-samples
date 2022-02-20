import { Action, Selector, State, StateContext } from '@ngxs/store';

export type Alert = {
  message?: string;
  color?: string;
  show?: boolean
};

export class GlobalStateModel {
  alert: Alert | null = null;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GlobalActions {
  export class setAlert {
    static readonly type = '[Alert] SetAlert';
    constructor(public payload: Alert) {}
  }
}

@State<GlobalStateModel>({
  name: 'global',
  defaults: { alert: null },
})
export class GlobalState {
  @Selector()
  static getAlert(state: GlobalStateModel) {
    return state.alert;
  }

  @Action(GlobalActions.setAlert)
  setAlert(
    { patchState }: StateContext<GlobalStateModel>,
    action: GlobalActions.setAlert
  ) {
    const alert = action.payload;
    console.log("Setting alert ", alert);
    patchState({ alert });
  }
}
