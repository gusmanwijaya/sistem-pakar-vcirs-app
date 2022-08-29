import { GET_ALL_SOLUSI, ERROR_SOLUSI, SET_PAGE } from "./types";
import { getAll } from "../../services/solusi";

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllSolusi = (allData, total_page) => {
  return {
    type: GET_ALL_SOLUSI,
    allData,
    total_page,
  };
};

const setErrorSolusi = (error) => {
  return {
    type: ERROR_SOLUSI,
    error,
  };
};

const fetchAllSolusi = () => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().solusiReducers?.page || 1,
      limit: getState().solusiReducers?.limit || 10,
    };

    const response = await getAll(params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllSolusi(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorSolusi(response));
    }
  };
};

export { fetchAllSolusi, setPage };
