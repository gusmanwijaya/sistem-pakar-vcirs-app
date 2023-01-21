import { ERROR_IDENTIFIKASI, GET_ALL_IDENTIFIKASI, SET_PAGE } from "./types";
import { getGejala } from "../../services/identifikasi";

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllPertanyaan = (allData, total_page) => {
  return {
    type: GET_ALL_IDENTIFIKASI,
    allData,
    total_page,
  };
};

const setErrorPertanyaan = (error) => {
  return {
    type: ERROR_IDENTIFIKASI,
    error,
  };
};

const fetchAllPertanyaan = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().identifikasiReducers?.page || 1,
      limit: getState().identifikasiReducers?.limit || 10,
    };

    const response = await getGejala(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllPertanyaan(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorPertanyaan(response));
    }
  };
};

export { fetchAllPertanyaan, setPage };
