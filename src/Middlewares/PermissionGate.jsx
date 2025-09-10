import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NoPermission from "../components/NoPermission";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { usePagePermissionListMutation } from "../features/permission_page/page_permission";
import { showCustomToast } from "../components/CustomToast";
import MainLoader from "../components/Loader";
import { setPermissionList } from "../utils/Utils";
import { useDispatch } from "react-redux";
// -------------------------------------------------------------

function pathToPageName(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";
  if (!last) return "dashboard";
  const cleaned = last.replace(/-/g, " ");
  return cleaned;
}

// -------------------------------------------------------------

export default function PermissionGate({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [rows, setRows] = useState(null);
  const currentPageName = useMemo(
    () => pathToPageName(location.pathname),
    [location.pathname]
  );

  const [PagePermissionList, { isLoading }] = usePagePermissionListMutation();

  const fetchingPagePermissionList = async () => {
    const {
      success,
      status,
      ApiData = {},
    } = await fetchWithErrorHandling(() => PagePermissionList().unwrap());

    if (success) {
      const { permission = [] } = ApiData || {};
      setRows(permission);
      dispatch(setPermissionList(permission));
    } else {
      if (status === 401) {
        showCustomToast("Fetch failed", "/error.gif", "Error");
      }
    }
  };

  useEffect(() => {
    fetchingPagePermissionList();
  }, []);

  const canView = useMemo(() => {
    if (!rows) return false;
    const found = rows.find(
      (path) =>
        (path.page_name || "").toLowerCase() === currentPageName.toLowerCase()
    );
    return !!found && Number(found.view) === 1;
  }, [rows, currentPageName]);

  if (isLoading) {
    return <MainLoader />;
  }
  return !canView ? <NoPermission /> : <>{children}</>;
}
