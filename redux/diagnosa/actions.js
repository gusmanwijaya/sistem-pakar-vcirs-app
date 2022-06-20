import {
  SET_DIAGNOSA,
  GET_ALL_DIAGNOSA,
  ERROR_DIAGNOSA,
  SET_PAGE,
  SET_USER,
} from "./types";
import { create, getAll } from "../../services/diagnosa";
import debounce from "debounce-promise";

const debouncedCreate = debounce(create, 100);
const debouncedGetAll = debounce(getAll, 100);

const setDiagnosa = (
  user,
  tanggal,
  variable,
  totalVariable,
  variableOrder,
  credit,
  numOfNode,
  VUR,
  NUR,
  RUR,
  cfPakar,
  cfUser,
  CFR,
  cfCombine,
  percentage,
  hamaPenyakit
) => {
  return {
    type: SET_DIAGNOSA,
    user,
    tanggal,
    variable,
    totalVariable,
    variableOrder,
    credit,
    numOfNode,
    VUR,
    NUR,
    RUR,
    cfPakar,
    cfUser,
    CFR,
    cfCombine,
    percentage,
    hamaPenyakit,
  };
};

const createDiagnosa = (data) => {
  return async (dispatch) => {
    const response = await debouncedCreate(data);
    if (response?.data?.statusCode === 201) {
      dispatch(
        setDiagnosa(
          response?.data?.data?.user,
          response?.data?.data?.tanggal,
          response?.data?.data?.variable,
          response?.data?.data?.totalVariable,
          response?.data?.data?.variableOrder,
          response?.data?.data?.credit,
          response?.data?.data?.numOfNode,
          response?.data?.data?.VUR,
          response?.data?.data?.NUR,
          response?.data?.data?.RUR,
          response?.data?.data?.cfPakar,
          response?.data?.data?.cfUser,
          response?.data?.data?.CFR,
          response?.data?.data?.cfCombine,
          response?.data?.data?.percentage,
          response?.data?.data?.hamaPenyakit
        )
      );
    }
  };
};

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setGetAllDiagnosa = (allData, total_page) => {
  return {
    type: GET_ALL_DIAGNOSA,
    allData,
    total_page,
  };
};

const setErrorDiagnosa = (error) => {
  return {
    type: ERROR_DIAGNOSA,
    error,
  };
};

const fetchAllDiagnosa = (idUser) => {
  return async (dispatch, getState) => {
    const params = {
      page: getState().diagnosaReducers?.page || 1,
      limit: getState().diagnosaReducers?.limit || 10,
    };

    const response = await debouncedGetAll(idUser, params?.page, params?.limit);
    if (response?.data?.statusCode === 200) {
      dispatch(
        setGetAllDiagnosa(response?.data?.data, response?.data?.total_page)
      );
    } else {
      dispatch(setErrorDiagnosa(response));
    }
  };
};

export { createDiagnosa, fetchAllDiagnosa, setUser, setPage };
