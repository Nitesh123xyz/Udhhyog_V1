import toast from "react-hot-toast";
import { UNSAFE_createBrowserHistory } from "react-router-dom";
import { clearSession, setSessionExpire } from "./StoreSessionInfo";

export const history = UNSAFE_createBrowserHistory();

export const fetchWithErrorHandling = async (fetchFunction, options = {}) => {
  try {
    const { status, body } = await fetchFunction();

    if (status === 200) {
      return { success: true, data: body };
    } else {
      throw new Error(`Request failed with status ${status}`);
    }
  } catch (error) {
    const { status } = error || {};
    if (status === 401) {
      toast.error("Unauthorized Access Please Login Again");
    } else if (status === 403) {
      toast.error("Something went wrong Please Contact Technical Staff");
    } else if (status === 406) {
      toast.error("Session Expired Please Login Again");
      setSessionExpire(true);
      clearSession();
      window.location.href = "/session-expired";
    }
    return { success: false, status: error?.status };
  }
};
