const ProfileReducers = (
  state = {
    email: "",
    name: "",
    phone: "",
    points: "",
    score: "",
    perLvl: "",
    errMsg: "",
  },
  action
) => {
  switch (action.type) {
    case "profile":
      return action.payload;
    default:
      return state;
  }
};

export default ProfileReducers;
