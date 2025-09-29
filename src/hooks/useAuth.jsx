import { useSelector } from "react-redux";

export default function useAuth() {
  const token = useSelector((state) => state.UtileSlice.accessToken);
  const hasToken = !!token?.trim();
  return { token, hasToken };
}
