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

const FontWeightKey = "AppFontWeight";
export const setAppFontWeight = (FontWeight) => {
  FontWeight
    ? localStorage.setItem(FontWeightKey, FontWeight)
    : localStorage.removeItem(FontWeightKey);
};
export const getAppFontWeight = () =>
  localStorage.getItem(FontWeightKey) || "font-default";

// ------------------------------------------------------

const ThemeKey = "ThemeMode";

export const setThemeMode = (Theme) => {
  Theme
    ? localStorage.setItem(ThemeKey, Theme)
    : localStorage.removeItem(ThemeKey);
};
export const getThemeMode = () => localStorage.getItem(ThemeKey) || "light";

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

const SessionExpire = "SessionExpire";

export const getSessionExpire = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "false");
  } catch {
    return false;
  }
};

export const setSessionExpire = (value) => {
  if (typeof value === "boolean") {
    localStorage.setItem(KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(KEY);
  }

  // notify this tab immediately
  window.dispatchEvent(
    new CustomEvent("session-expire-change", {
      detail: { value: getSessionExpire() },
    })
  );
};

export const clearSessionExpire = () => {
  sessionStorage.removeItem(SessionExpire);
};

// ------------------------------------------------------

export const clearSession = () => {
  const theme = localStorage.getItem("ThemeMode");
  sessionStorage.clear();
  localStorage.clear();
  if (theme) {
    localStorage.setItem("ThemeMode", theme);
  }
};

export const clearAllSession = () => {
  const theme = localStorage.getItem("ThemeMode");
  sessionStorage.clear();
  localStorage.clear();
  if (theme) {
    localStorage.setItem("ThemeMode", theme);
  }
};

// ------------------------------------------------------
