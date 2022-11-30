const rainforestReducer = (state = { recentItems: [], numAssets: null, numLosses: null }, action) => {
  switch (action.type) {
    case "SET_RECENT_ITEMS":
      return { ...state, recentItems: action.payload };
    case "SET_NUM_ASSETS":
      return { ...state, numAssets: action.payload };
    case "SET_LOSSES":
      return { ...state, numLosses: action.payload };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default rainforestReducer;
