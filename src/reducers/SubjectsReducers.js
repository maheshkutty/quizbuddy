const SubjectsReducers = (
  state = { data: [], errMsg: "", successMsg: "" },
  action
) => {
  switch (action.type) {
    case "GET_Subjects":
      return { data: action.payload, errMsg: "", successMsg: "" };
    case "err_msg":
      return { data: [], errMsg: action.payload, successMsg: "" };
    default:
      return state;
  }
};

export default SubjectsReducers;
