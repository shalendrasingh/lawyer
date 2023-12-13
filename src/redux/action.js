import axios from "axios";
import * as types from "./actionTypes";
import { snackbarNotification } from "./snackbar/action";
export const addLawyer = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_LAWYER_REQUEST });
  const authToken = JSON.parse(localStorage.getItem("token")) || "";
  return axios
    .post(`http://localhost:5000/api/addLawyer`, payload, {
      headers: {
        Authorization: `${authToken}`,
      },
    })
    .then((r) => {
      dispatch({ type: types.ADD_LAWYER_SUCCESS, payload: r });
      const data = {
        notificationType: "success",
        notificationMessage: "Doctor Added Successfully",
      };
      dispatch(snackbarNotification(data));
      return r;
    })
    .catch((e) => {
      dispatch({ type: types.ADD_LAWYER_FAILURE, payload: e });

      if (e?.response?.data?.message) {
        const data = {
          notificationType: "error",
          notificationMessage: e?.response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      }
    });
};

export const getAllLawyer = (payload) => (dispatch) => {
  dispatch({ type: types.GET_ALL_LAWYER_REQUEST });
  return axios
    .get(`http://localhost:5000/api/allLawyer`, {})
    .then((r) => {
      dispatch({ type: types.GET_ALL_LAWYER_SUCCESS, payload: r });
      return r;
    })
    .catch((e) => {
      dispatch({ type: types.GET_ALL_LAWYER_FAILURE, payload: e });

      if (e?.response?.data?.message) {
        const data = {
          notificationType: "error",
          notificationMessage: e?.response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      }
      return e;
    });
};
export const updateLawyer = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_LAWYER_REQUEST });
  const authToken = JSON.parse(localStorage.getItem("token")) || "";
  return axios
    .patch(`http://localhost:5000/api/${id}`, payload, {
      headers: {
        Authorization: `${authToken}`,
      },
    })
    .then((r) => {
      dispatch({ type: types.UPDATE_LAWYER_SUCCESS, payload: r });
      const data = {
        notificationType: "success",
        notificationMessage: "Doctor Updated Successfully",
      };
      dispatch(snackbarNotification(data));
      return r;
    })
    .catch((e) => {
      dispatch({ type: types.UPDATE_LAWYER_FAILURE, payload: e });

      if (e?.response?.data?.message) {
        const data = {
          notificationType: "error",
          notificationMessage: e?.response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      }
    });
};

export const getSearch = (query) => (dispatch) => {
  dispatch({ type: types.GET_ALL_LAWYER_REQUEST });
  const authToken = JSON.parse(localStorage.getItem("token")) || "";
  return axios
    .get(`http://localhost:5000/api/Search?searchParam=${query}`, {
      headers: {
        Authorization: `${authToken}`,
      },
    })
    .then((response) => {
      dispatch({ type: types.GET_ALL_LAWYER_SUCCESS, payload: response });
      if (response?.data?.message) {
        const data = {
          notificationType: "success",
          notificationMessage: response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      }
      return response;
    })
    .catch((error) => {
      dispatch({ type: types.GET_ALL_LAWYER_FAILURE, payload: error });

      if (error?.response?.data?.message) {
        const data = {
          notificationType: "error",
          notificationMessage: error?.response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      }
      return error;
    });
};
