const KEY = "token";
export const setToken = (Token) =>
  Token ? sessionStorage.setItem(KEY, Token) : sessionStorage.removeItem(KEY);

export const getToken = () => sessionStorage.getItem(KEY) || null;

// ------------------------------------------------------
const MenuKey = "leftSideNavigationMenu";
export const setLeftSideNavigationMenu = (Menu) =>
  Menu
    ? sessionStorage.setItem(MenuKey, JSON.stringify(Menu))
    : sessionStorage.removeItem(MenuKey);

export const getLeftSideNavigationMenu = () =>
  JSON.parse(sessionStorage.getItem(MenuKey)) || [];

// ------------------------------------------------------
const UserKey = "UserInfo";

export const setUserInfo = (UserInfo) => {
  UserInfo
    ? sessionStorage.setItem(UserKey, JSON.stringify(UserInfo))
    : sessionStorage.removeItem(UserKey);
};

export const getUserInfo = () =>
  JSON.parse(sessionStorage.getItem(UserKey)) || null;

// ------------------------------------------------------

const SessionExpire = "Expire";

export const setSessionExpire = (UserInfo) => {
  UserInfo
    ? localStorage.setItem(SessionExpire, JSON.stringify(UserInfo))
    : localStorage.removeItem(SessionExpire);
};

export const getSessionExpire = () =>
  JSON.parse(localStorage.getItem(SessionExpire)) || null;

export const clearSession = () => {
  sessionStorage.clear();
  localStorage.removeItem("CurrentLabel");
  localStorage.removeItem(SessionExpire);
};

// ------------------------------------------------------
