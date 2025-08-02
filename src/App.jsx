import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useCheckingUserMutation } from "./features/api/authSlice";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/forgot-password"];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);

  const [checkUser, { data, isLoading, isSuccess, error }] =
    useCheckingUserMutation();

  return (
    <>
      {!HideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
