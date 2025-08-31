import { UNSAFE_createBrowserHistory } from "react-router-dom";

export const history = UNSAFE_createBrowserHistory();

export const fetchWithErrorHandling = async (fetchFunction, options = {}) => {
  try {
    const { status, body } = await fetchFunction();

    if (status === 200) {
      return { success: true, data: body };
    } else if (status === 403) {
      return { success: false, error: "Wrong Api key" };
    } else if (status === 406) {
      history.push("/login");
      return { success: false, error: "Session Expired" };
    } else {
      throw new Error(`Request failed with status ${status}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, error: error.message };
  }
};
