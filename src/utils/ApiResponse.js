import { clearSession, setSessionExpire } from "./StoreSessionInfo";
import { showCustomToast } from "../components/CustomToast";

export const fetchWithErrorHandling = async (fetchFunction = () => {}) => {
  try {
    const { status, body } = await fetchFunction();

    if (status === 200) {
      return { success: true, status, ApiData: body };
    } else if (status === 202) {
      return { success: true, status };
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
    } else if (status === 406) {
      showCustomToast(
        "Session Expired Please Login Again",
        "/error.gif",
        "Error"
      );
      setSessionExpire(true);
      clearSession();
      window.location.href = "/session-expired";
    } else {
      showCustomToast(
        `Something went wrong! Please try again. status: ${status}`,
        "/error.gif",
        "Error"
      );
    }
  }
};
