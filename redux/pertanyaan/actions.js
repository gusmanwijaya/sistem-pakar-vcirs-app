import { GET_ALL_PERTANYAAN, ERROR_PERTANYAAN, SET_PAGE } from "./types";
import { getAll } from "../../services/pertanyaan";
import debounce from "debounce-promise";

const debouncedGetAll = debounce(getAll, 100);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllPertanyaan = (allData, total_page) => {
  return {
    type: GET_ALL_PERTANYAAN,
    allData,
    total_page,
  };
};

const setErrorPertanyaan = (error) => {
  return {
    type: ERROR_PERTANYAAN,
    error,
  };
};

const fetchAllPertanyaan = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().pertanyaanReducers?.page || 1,
      limit: getState().pertanyaanReducers?.limit || 1,
    };

    const response = await debouncedGetAll(params?.page, params?.limit);
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
