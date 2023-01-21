import {
  GET_ALL_HAMA_PENYAKIT,
  ERROR_HAMA_PENYAKIT,
  SET_KEYWORD,
  SET_PAGE,
} from "./types";
import { getAll } from "../../services/hama-penyakit";

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllHamaPenyakit = (allData, total_page) => {
  return {
    type: GET_ALL_HAMA_PENYAKIT,
    allData,
    total_page,
  };
};

const setErrorHamaPenyakit = (error) => {
  return {
    type: ERROR_HAMA_PENYAKIT,
    error,
  };
};

const fetchAllHamaPenyakit = (isDashboard = false) => {
  return async (dispatch, getState) => {
    const params = {
      keyword: getState().hamaPenyakitReducers.keyword || "",
      page: getState().hamaPenyakitReducers?.page || 1,
      limit: isDashboard
        ? 9999999
        : getState().hamaPenyakitReducers?.limit || 10,
    };

    const response = await getAll(params?.keyword, params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllHamaPenyakit(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorHamaPenyakit(response));
    }
  };
};

export { fetchAllHamaPenyakit, setKeyword, setPage };
