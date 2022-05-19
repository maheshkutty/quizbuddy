const QuizReducers = (
  state = {
    errMsg: "",
    successMsg: "",
    quizList: { timeInMins: "", noQuestions: "", quiz_id: "" },
    questions: null,
  },
  action
) => {
  switch (action.type) {
    case "GET_Quiz":
      return { ...state, quizList: action.payload };
    case "GET_Questions":
      return { ...state, questions: action.payload };
    case "err_msg":
      return { ...state, errMsg: action.payload, successMsg: "" };
    default:
      return state;
  }
};

export default QuizReducers;
