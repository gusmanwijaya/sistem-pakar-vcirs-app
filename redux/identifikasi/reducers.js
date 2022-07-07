import { SET_IDENTIFIKASI, ERROR_IDENTIFIKASI } from "./types";

const initialState = {
  user: "",
  tanggal: "",
  hamaPenyakit: "",
  cfUser: [],
  variable: [],
  totalVariable: 0,
  variableOrder: [],
  numOfNode: [],
  VUR: [],
  NUR: 0,
  RUR: 0,
  cfPakar: [],
  CFR: [],
  _tempCfCombine: [],
  cfCombine: 0,
  percentage: "",
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_IDENTIFIKASI:
      return {
        ...state,
        user: action.user,
        tanggal: action.tanggal,
        hamaPenyakit: action.hamaPenyakit,
        cfUser: action.cfUser,
        variable: action.variable,
        totalVariable: action.totalVariable,
        variableOrder: action.variableOrder,
        numOfNode: action.numOfNode,
        VUR: action.VUR,
        NUR: action.NUR,
        RUR: action.RUR,
        cfPakar: action.cfPakar,
        CFR: action.CFR,
        _tempCfCombine: action._tempCfCombine,
        cfCombine: action.cfCombine,
        percentage: action.percentage,
      };

    case ERROR_IDENTIFIKASI:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducers;
