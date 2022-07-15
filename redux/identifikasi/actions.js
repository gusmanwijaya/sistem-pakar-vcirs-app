import { SET_IDENTIFIKASI } from "./types";

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

const createIdentifikasi = (data) => {
  return async (dispatch) => {
    dispatch(
      setIdentifikasi(
        data?.user,
        data?.tanggal,
        data?.hamaPenyakit,
        data?.cfUser,
        data?.variable,
        data?.totalVariable,
        data?.variableOrder,
        data?.numOfNode,
        data?.VUR,
        data?.NUR,
        data?.RUR,
        data?.cfPakar,
        data?.CFR,
        data?._tempCfCombine,
        data?.cfCombine,
        data?.percentage
      )
    );
  };
};

export { createIdentifikasi };
