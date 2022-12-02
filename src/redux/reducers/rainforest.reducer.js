const rainforestReducer = ( state = { defaultSearchItems: [] }, action ) => {
  switch (action.type) {
    case "SET_DEFAULT_SEARCH_ITEMS":
      return { ...state, defaultSearchItems: action.payload };
    default:
      return state;
  }
};

export default rainforestReducer;
