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

export const SCALE_KEY = "app_scale";

/** returns a number (scale), falls back to 1 */
export function getAppScale() {
  try {
    const v = localStorage.getItem(SCALE_KEY);
    return v ? parseFloat(v) : 1;
  } catch (e) {
    return 1;
  }
}

export function setAppScale(scale) {
  try {
    localStorage.setItem(SCALE_KEY, String(scale));
  } catch (e) {}
}

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
export const RefreshPage = () => {
  sessionStorage.removeItem("leftSideNavigationMenu");
};

// ------------------------------------------------------
