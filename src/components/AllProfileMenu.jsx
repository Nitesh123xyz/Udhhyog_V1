import React, { useEffect, useRef, useState } from "react";
import { useAllProfileMenuMutation } from "../features/utils/utilsSlice";
import { useDispatch } from "react-redux";
import { setProfileMenuList } from "../utils/Utils";
import useAuth from "../hooks/useAuth";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { ChevronDown } from "lucide-react";

const AllProfileMenu = () => {
  const DropDownList = useRef(null);
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [profileMenu, setProfileMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [fetchAllProfileMenu, { isLoading }] = useAllProfileMenuMutation();

  //   --------------------------------------------

  const handleUserLogin = async () => {
    const { success, status, ApiData } = await fetchWithErrorHandling(() =>
      fetchAllProfileMenu(token).unwrap()
    );
    const { employees } = ApiData || {};
    if (success && status === 200) {
      setProfileMenu(employees);
    }
  };

  //   --------------------------------------------

  const handleSelectMenu = (item) => {
    setSelected(item);
    setOpen(false);
    dispatch(setProfileMenuList(item?.emp_id));
  };

  //   --------------------------------------------

  useEffect(() => {
    handleUserLogin();
    const handleOutsideClick = (event) => {
      if (
        DropDownList.current &&
        !DropDownList.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  //   --------------------------------------------

  return (
    <div ref={DropDownList} className="relative w-64 sm:w-[20rem]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-md bg-[var(--background)] px-1 sm:px-4 py-2 text-sm text-[var(--text)]
        shadow-md transition-all duration-200 border border-[var(--border)]"
      >
        <span className="text-xs sm:text-sm">
          {selected
            ? `${selected.emp_id} : ${selected.emp_name}, ${selected.emp_profile}`
            : isLoading
            ? "Loading..."
            : "Select an employee"}
        </span>
        <ChevronDown
          size={18}
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute mt-2 w-full rounded-xl bg-[var(--background)] shadow-lg border border-[var(--border)] max-h-60 overflow-y-auto animate-fadeIn z-50">
          {profileMenu?.map((item) => (
            <li
              key={item.emp_id}
              onClick={() => handleSelectMenu(item)}
              className="cursor-pointer rounded-lg px-4 mx-1 my-1 py-2 text-xs sm:text-sm text-[var(--text)] hover:bg-[var(--border)] transition-colors"
            >
              {`${item.emp_id} : ${item.emp_name}, ${item.emp_profile}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProfileMenu;
