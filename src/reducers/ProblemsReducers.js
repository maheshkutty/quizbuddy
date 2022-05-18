const ProblemsReducers = (
  state = { errMsg: "", successMsg: "", data: [] },
  action
) => {
  switch (action.type) {
    case "PROBLEMS":
      return { data: action.payload, errMsg: "", successMsg: "" };
    case "err_msg":
      return { ...state, errMsg: action.payload, successMsg: "" };
    default:
      return state;
  }
};

export default ProblemsReducers;
