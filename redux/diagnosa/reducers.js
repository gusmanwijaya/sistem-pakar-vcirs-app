import { SET_DIAGNOSA } from "./types";

const initialState = {
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
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIAGNOSA:
      return {
        ...state,
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

    default:
      return state;
  }
};

export default reducers;
