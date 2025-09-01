import { useEffect, useState } from "react";
import { useLeftSideNavigationMenuMutation } from "../features/utils/utilsSlice";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import transformMenu from "../utils/ReuseData";
import {
  getLeftSideNavigationMenu,
  getToken,
  setLeftSideNavigationMenu,
  setUserInfo,
} from "../utils/StoreSessionInfo";

export const useMenu = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [LeftSideNavigationMenu] = useLeftSideNavigationMenuMutation();

  const fetchMenu = async () => {
    const result = await fetchWithErrorHandling(() =>
      LeftSideNavigationMenu().unwrap()
    );

    if (result.success) {
      const { menu, emp_name, emp_profile } = result?.data || {};
      setLeftSideNavigationMenu(Array.isArray(menu) ? menu : []);
      const menuItems = transformMenu(Array.isArray(menu) ? menu : []);
      setMenuList(menuItems);
      setUserInfo({ emp_name, emp_profile });
    } else {
      console.log("Menu fetch failed:");
    }
    setLoading(false);
  };

  useEffect(() => {
    const storedMenu = getLeftSideNavigationMenu();
    if (Array.isArray(storedMenu) && storedMenu.length > 0) {
      setMenuList(transformMenu(storedMenu));
      setLoading(false);
    } else {
      if (getToken()) {
        fetchMenu();
      }
    }
  }, [getToken()]);

  return { menuList, loading, setMenuList };
};
