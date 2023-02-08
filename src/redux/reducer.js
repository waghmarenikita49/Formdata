import * as types from "./actionType";
const initialState = {
  users: [],
  user: {},
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.DELETE_USER_START:
    case types.UPDATE_USER_START:
    case types.SEARCH_USER_START:
      case types.DOWNLOAD_PDF:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_USERS_SUCCESS:
    case types.SEARCh_USER_SUCCESS:
      case types.DOWNLOAD_PDF_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.SEARCH_USER_ERROR:
      case types.DOWNLOAD_PDF_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
