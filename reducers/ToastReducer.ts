interface Toast {
  id: number;
  message: string;
  type: "success" | "warning" | "info" | "error";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

  interface State {
    toasts: Toast[];
  }
  
  export enum actionTypes {
    ADD_TOAST = "ADD_TOAST",
    DELETE_TOAST = "DELETE_TOAST",
  }
  
  interface AddToastAction {
    type: actionTypes.ADD_TOAST;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
  }
  
  interface RemoveToastAction {
    type: actionTypes.DELETE_TOAST;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
  }
  
  type ToastAction = AddToastAction | RemoveToastAction;
  
  export const toastReducer = (state: State, action: ToastAction): State => {
    switch (action.type) {
      case actionTypes.ADD_TOAST:
        return { ...state, toasts: [...state.toasts, action.payload] };
      case actionTypes.DELETE_TOAST:
        return {
          ...state,
          toasts: state.toasts.filter((toast) => toast.id !== action.payload),
        };
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  };
  
  