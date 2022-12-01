const rainforestReducer = (state = { defaultSearchItems: [], numAssets: null, numLosses: null }, action) => {
  switch (action.type) {
    case "SET_DEFAULT_SEARCH_ITEMS":
      return { ...state, defaultSearchItems: action.payload };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default rainforestReducer;
