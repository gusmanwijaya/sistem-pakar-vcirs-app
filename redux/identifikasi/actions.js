import { SET_IDENTIFIKASI, ERROR_IDENTIFIKASI } from "./types";
import { create } from "../../services/identifikasi";
import debounce from "debounce-promise";

const debouncedCreate = debounce(create, 100);

const setIdentifikasi = (
  user,
  tanggal,
  hamaPenyakit,
  cfUser,
  variable,
  totalVariable,
  variableOrder,
  numOfNode,
  VUR,
  NUR,
  RUR,
  cfPakar,
  CFR,
  _tempCfCombine,
  cfCombine,
  percentage
) => {
  return {
    type: SET_IDENTIFIKASI,
    user,
    tanggal,
    hamaPenyakit,
    cfUser,
    variable,
    totalVariable,
    variableOrder,
    numOfNode,
    VUR,
    NUR,
    RUR,
    cfPakar,
    CFR,
    _tempCfCombine,
    cfCombine,
    percentage,
  };
};

const setErrorIdentifikasi = (error) => {
  return {
    type: ERROR_IDENTIFIKASI,
    error,
  };
};

const createIdentifikasi = (data) => {
  return async (dispatch) => {
    const response = await debouncedCreate(data);
    if (response?.data?.statusCode === 201) {
      dispatch(
        setIdentifikasi(
          response?.data?.data?.user,
          response?.data?.data?.tanggal,
          response?.data?.data?.hamaPenyakit,
          response?.data?.data?.cfUser,
          response?.data?.data?.variable,
          response?.data?.data?.totalVariable,
          response?.data?.data?.variableOrder,
          response?.data?.data?.numOfNode,
          response?.data?.data?.VUR,
          response?.data?.data?.NUR,
          response?.data?.data?.RUR,
          response?.data?.data?.cfPakar,
          response?.data?.data?.CFR,
          response?.data?.data?._tempCfCombine,
          response?.data?.data?.cfCombine,
          response?.data?.data?.percentage
        )
      );
    } else {
      dispatch(setErrorIdentifikasi(response));
    }
  };
};

export { createIdentifikasi };
