const SignUpReducers = (state = { errMsg: null, successMsg: null }, action) => {
  switch (action.type) {
    case "SIGNUP_USER":
      return action.payload;
    case "change_msg":
      return { ...state, successMsg: action.payload };
    default:
      return state;
  }
};

export default SignUpReducers;
