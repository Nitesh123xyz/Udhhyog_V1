const KEY = "token";
export const setToken = (Token) =>
  Token ? sessionStorage.setItem(KEY, Token) : sessionStorage.removeItem(KEY);

export const getToken = () => sessionStorage.getItem(KEY) || "";
