import { useEffect, useState } from "react";
import { useLeftSideNavigationMenuMutation } from "../features/utils/utilsSlice";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import transformMenu from "../utils/ReuseData";
import {
  getLeftSideNavigationMenu,
  setLeftSideNavigationMenu,
  setUserInfo,
} from "../utils/StoreSessionInfo";
import useAuth from "../hooks/useAuth";

export const useMenu = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [LeftSideNavigationMenu] = useLeftSideNavigationMenuMutation();
  const { token, hasToken } = useAuth();

  const fetchMenu = async () => {
    const { success, ApiData } = await fetchWithErrorHandling(() =>
      LeftSideNavigationMenu(token).unwrap()
    );

    if (success) {
      const { menu, emp_name, emp_profile } = ApiData || {};
      setLeftSideNavigationMenu(Array.isArray(menu) ? menu : []);
      const menuItems = transformMenu(Array.isArray(menu) ? menu : []);
      setMenuList(menuItems);
      setUserInfo({ emp_name, emp_profile });
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedMenu = getLeftSideNavigationMenu();
    if (Array.isArray(storedMenu) && storedMenu.length > 0) {
      setMenuList(transformMenu(storedMenu));
      setLoading(false);
    } else {
      if (hasToken) {
        fetchMenu();
      }
    }
  }, [hasToken]);

  return { menuList, loading, setMenuList };
};
