import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useUpdateUsersPreferenceMutation } from "../features/users/usersSlice";
import base32 from "hi-base32";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
const FONT_CLASSES = {
  Normal: "font-default",
  Light: "font-first",
  Medium: "font-second",
  Bold: "font-third",
};

const FontSwitch = ({ themeMode, font, setFont, scale }) => {
  const [UpdatePreference] = useUpdateUsersPreferenceMutation();
  const { token } = useAuth();
  const handleToggleFontWeight = async (e) => {
    try {
      const preferenceSetting = {
        token: token,
        thememode: themeMode,
        appfontweight: e.target.value,
        appscale: scale,
        photo_url: "abc",
      };
      setFont(e.target.value);
      const encoded = base32.encode(JSON.stringify(preferenceSetting));
      const { status } = await UpdatePreference({
        data: encoded,
      }).unwrap();
      if (status === 200) {
        toast.success(`${e.target.value} Mode Enable`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...Object.values(FONT_CLASSES));
    root.classList.add(FONT_CLASSES[font]);
  }, [font]);

  return (
    <div className="relative w-32 md:w-44">
      <select
        value={font}
        onChange={(e) => handleToggleFontWeight(e)}
        className="w-full px-3 py-2 pr-10 text-sm 
        rounded-lg border border-[var(--border)]
        bg-[var(--background)] text-[var(--text)]
        shadow-sm outline-none 
        appearance-none"
      >
        {Object.keys(FONT_CLASSES).map((font) => (
          <option
            key={font}
            value={font}
            className="rounded-md bg-[var(--background)] text-[var(--text)]"
          >
            {font}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)] pointer-events-none"
      />
    </div>
  );
};

export default FontSwitch;
