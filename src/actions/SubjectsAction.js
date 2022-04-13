import qbuddy from "../api/qbuddy";

export const getSubjectsAction = (id) => async (dispatch, getStates) => {
  let response = [];
  try {
    // response = await qbuddy.get(`/admin/class/${id}/subjects`);
    response = await qbuddy.get(`/admin/classes/subjects`);
    console.log(response);
    response = response.data.res.map((element, i) => {
      return { ...element, srno: i + 1 };
    });
    dispatch({ type: "GET_Subjects", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "err_msg", payload: "Error while processing request" });
  }
};
