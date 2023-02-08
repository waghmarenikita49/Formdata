import {
  takeLatest,
  put,
  call,
  fork,
  all,
  take,
  delay,
} from "redux-saga/effects";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
  searchUserSuccess,
  searchUserError,
  downloadPdfSuccess,
  downloadPdfFailed,
} from "./actions";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  searchUserApi,
} from "./api";

import * as types from "./actionType";
import axios from "axios";

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error));
  }
}

function* deleteUser(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error));
  }
}

function* onDeleteUserRequest() {
  while (true) {
    const { payload: id } = yield take(types.DELETE_USER_START);
    yield call(deleteUser, id);
  }
}


function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    console.log("responseCreate", response);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error));
  }
}
function* downloadPdfSaga({ payload :pdf}) {
  try {
    const response = yield call( axios.get,
      `http://localhost:5000/users/${pdf}/pdf`);
    // console.log("responseCreate", response);
    const pdfBlob = new Blob([response.data], {type:'application/pdf'});
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl,'_blank');
    yield put (downloadPdfSuccess(pdfBlob));

  } catch (error) {
    yield put(downloadPdfFailed(error));
  }
}
function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}

function* onSearchUserStartAsync({ payload: query  }) {
  try {
    const response = yield call(searchUserApi, query);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (error) {
    yield put(searchUserError(error.response.data));
  }
}
export function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onSearchUser() {
  yield takeLatest(types.SEARCH_USER_START, onSearchUserStartAsync);
}

export function* watchDownloadPdf() {
  yield takeLatest(types.DOWNLOAD_PDF, downloadPdfSaga);
}


const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUserRequest),
  fork(onUpdateUser),
  fork(onSearchUser),
  fork(watchDownloadPdf)
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
