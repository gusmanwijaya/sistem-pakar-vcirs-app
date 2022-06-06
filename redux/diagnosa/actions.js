import { SET_DIAGNOSA } from "./types";
import { create } from "../../services/diagnosa";
import debounce from "debounce-promise";

const debouncedCreate = debounce(create, 100);

const setDiagnosa = (
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

export { createDiagnosa };
