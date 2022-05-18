import qbuddy from "../api/qbuddy";

export const problemAction = (payload) => async (dispatch, getStates) => {
  const { sid, cid, CHid, dificulty_lvl } = payload;
  let response = [];
  try {
    response = await qbuddy.post("/student/problems", payload);
    response = response.data.res.map((element, i) => {
      return { ...element, srno: i + 1 };
    });
    dispatch({ type: "PROBLEMS", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "err_msg", payload: "Error while processing request" });
  }
};
