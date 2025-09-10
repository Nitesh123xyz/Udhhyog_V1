// import { useDispatch } from "react-redux";
import { showCustomToast } from "../components/CustomToast";
import { setSessionExpire } from "./StoreSessionInfo";

export const fetchWithErrorHandling = async (fetchFunction = () => {}) => {
  // const dispatch = useDispatch();
  try {
    const { status, body } = await fetchFunction();

    if (status === 200) {
      return { success: true, status, ApiData: body };
    } else {
      showCustomToast(
        `Something went wrong! Please try again. status: ${status}`,
        "/error.gif",
        "Error"
      );
    }
  } catch (error) {
    const { status } = error || {};
    if (status === 401) {
      return { success: false, status };
    } else if (status === 403) {
      showCustomToast(
        "Something went wrong Please Contact Technical Staff",
        "/error.gif",
        "Error"
      );
      return { success: false, status };
    } else if (status === 406) {
      setSessionExpire(true);
      return { success: false, status };
    } else {
      showCustomToast(
        `Something went wrong! Please try again later.`,
        "/error.gif",
        "Error"
      );
    }
  }
};
