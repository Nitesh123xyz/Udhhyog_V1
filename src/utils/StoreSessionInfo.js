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

const SessionExpireKey = "SessionExpire";

export const getSessionExpire = () => {
  try {
    return JSON.parse(localStorage.getItem(SessionExpireKey) ?? "false");
  } catch {
    return false;
  }
};

export const setSessionExpire = (value) => {
  if (typeof value === "boolean") {
    localStorage.setItem(SessionExpireKey, JSON.stringify(value));
  } else {
    localStorage.removeItem(SessionExpireKey);
  }

  // notify this tab immediately
  window.dispatchEvent(
    new CustomEvent("session-expire-change", {
      detail: { value: getSessionExpire() },
    })
  );
};

export const clearSessionExpire = () => {
  sessionStorage.removeItem(SessionExpireKey);
};

// ------------------------------------------------------

export const clearSession = () => {
  sessionStorage.clear();
  localStorage.clear();
};

// ------------------------------------------------------
export const RefreshPage = () => {
  sessionStorage.removeItem("leftSideNavigationMenu");
};

// ------------------------------------------------------
