const ClassesReducers = (
  state = { data: [], errMsg: "", successMsg: "" },
  action
) => {
  switch (action.type) {
    case "GET_Chapters":
      return { data: action.payload, errMsg: "", successMsg: "" };
    case "err_msg":
      return { ...state, errMsg: action.payload, successMsg: "" };
    default:
      return state;
  }
};

export default ClassesReducers;
