import qbuddy from "../api/qbuddy";

export const getQuizAction = (payload) => async (dispatch, getStates) => {
  const { sid, cid, CHid, dificulty_lvl } = payload;
  let response = {};
  try {
    response = {
      status: "success",
      msg: "Successfuly Quiz Created",
      quiz_id: 5,
      timeInMins: 20,
      noQuestions: 20,
      difficulty: "Medium",
    };
    // response = await qbuddy.post("/student/generatequiz", payload);
    // console.log(response);
    // response = response.data.res.map((element, i) => {
    //   return { ...element, srno: i + 1 };
    // });
    dispatch({ type: "GET_Quiz", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "err_msg", payload: "Error while processing request" });
  }
};

export const getQuizProblemsAction =
  (payload) => async (dispatch, getStates) => {
    const { sid, quiz_id } = payload;
    let response = [];
    try {
      response = await qbuddy.post("/student/startQuiz", payload);
      console.log(response);
      response = response.data.res.map((element, i) => {
        return { ...element, srno: i + 1 };
      });
      dispatch({ type: "GET_Questions", payload: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: "err_msg", payload: "Error while processing request" });
    }
  };
