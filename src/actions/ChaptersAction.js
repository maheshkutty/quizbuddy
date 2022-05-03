///admin/classes/subject/chapters

import qbuddy from "../api/qbuddy";

export const getChaptersAction = () => async (dispatch, getStates) => {
  let response = [];
  try {
    response = await qbuddy.get("/admin/classes/subject/chapters");
    response = response.data.res.map((element, i) => {
      return { ...element, srno: i + 1};
    });
    console.log(response);
    dispatch({ type: "GET_Chapters", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "err_msg", payload: "Error while processing request" });
  }
};

// export const deleteClassesAction = () => async (dispatch, getStates) => {};
