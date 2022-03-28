import { useCallback, useReducer } from 'react';

export type State = {
  loading: boolean;
  error: string;
  id: string;
  nick: string;
  friendNick: string;
  location: string;
  cookies: {
    [x: string]: string;
  } | null;
};

export type Action =
  | {
      type: 'LOADING';
    }
  | {
      type: 'SUCCESS';
    }
  | {
      type: 'ERROR';
      payload: string;
    }
  | {
      type: 'SET_FIELD';
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'SET_COOKIES';
      payload: {
        [x: string]: string;
      };
    };

export const initialState: State = {
  loading: false,
  error: '',
  id: '',
  nick: '',
  friendNick: '',
  location: '',
  cookies: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_FIELD':
      return {
        ...state,
        loading: false,
        error: '',
        [action.payload.name]: action.payload.value,
      };
    case 'SET_COOKIES':
      return {
        ...state,
        loading: false,
        error: '',
        cookies: action.payload,
      };
    default:
      return state;
  }
};

const useReducerHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback(() => dispatch({ type: 'LOADING' }), []);
  const setSuccess = useCallback(() => dispatch({ type: 'SUCCESS' }), []);
  const setError = useCallback(
    (error: string) => dispatch({ type: 'ERROR', payload: error }),
    []
  );
  const setField = useCallback(
    (name: string, value: string) =>
      dispatch({ type: 'SET_FIELD', payload: { name, value } }),
    []
  );
  const setCookies = useCallback(
    (cookies: { [x: string]: string }) =>
      dispatch({ type: 'SET_COOKIES', payload: cookies }),
    []
  );

  return { state, setLoading, setSuccess, setError, setField, setCookies };
};

export default useReducerHook;
