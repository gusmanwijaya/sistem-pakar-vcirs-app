import {
  SET_DIAGNOSA,
  GET_ALL_DIAGNOSA,
  ERROR_DIAGNOSA,
  SET_PAGE,
  SET_USER,
} from "./types";

const initialState = {
  user: "",
  tanggal: "",
  variable: [],
  totalVariable: 0,
  variableOrder: [],
  credit: [],
  numOfNode: [],
  VUR: [],
  NUR: 0,
  RUR: 0,
  cfPakar: [],
  cfUser: [],
  CFR: [],
  cfCombine: 0,
  percentage: "",
  hamaPenyakit: {},
  page: 1,
  limit: 10,
  total_page: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIAGNOSA:
      return {
        ...state,
        user: action.user,
        tanggal: action.tanggal,
        variable: action.variable,
        totalVariable: action.totalVariable,
        variableOrder: action.variableOrder,
        credit: action.credit,
        numOfNode: action.numOfNode,
        VUR: action.VUR,
        NUR: action.NUR,
        RUR: action.RUR,
        cfPakar: action.cfPakar,
        cfUser: action.cfUser,
        CFR: action.CFR,
        cfCombine: action.cfCombine,
        percentage: action.percentage,
        hamaPenyakit: action.hamaPenyakit,
      };

    case GET_ALL_DIAGNOSA:
      return {
        ...state,
        allData: action.allData,
        total_page: action.total_page,
      };

    case ERROR_DIAGNOSA:
      return {
        ...state,
        error: action.error,
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
};

export default reducers;
