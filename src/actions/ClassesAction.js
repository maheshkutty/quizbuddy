import qbuddy from "../api/qbuddy";

export const getClassesAction = () => async (dispatch, getStates) => {
  let response = [];
  try {
    response = await qbuddy.get("/admin/classes");
    response = response.data.res.map((element, i) => {
      return { ...element, srno: i + 1};
    });
    dispatch({ type: "GET_Classes", payload: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: "err_msg", payload: "Error while processing request" });
  }
};

// export const deleteClassesAction = () => async (dispatch, getStates) => {};
