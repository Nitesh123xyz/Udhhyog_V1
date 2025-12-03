import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useUpdateUsersPreferenceMutation } from "../features/users/usersSlice";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import base32 from "hi-base32";
const BASE_FONT = 16;

const SCALE_OPTIONS = [
  { label: "A", value: 1 },
  { label: "A+", value: 1.3 },
  { label: "A-", value: 0.88 },
];

const TextScaler = ({ themeMode, scale, setScale, font }) => {
  const [UpdatePreference] = useUpdateUsersPreferenceMutation();
  const { token } = useAuth();
  const handleToggleTextScale = async (e) => {
    try {
      const preferenceSetting = {
        token: token,
        thememode: themeMode,
        appfontweight: font,
        appscale: e.target.value,
        photo_url: "abc",
      };
      setScale(e.target.value);
      const encoded = base32.encode(JSON.stringify(preferenceSetting));
      const { status } = await UpdatePreference({
        data: encoded,
      }).unwrap();
      if (status === 200) {
        const matchLabel = SCALE_OPTIONS?.find(
          (item) => item.value === Number(e.target.value)
        );
        toast.success(`${matchLabel?.label} Mode Enable`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--app-scale", String(scale));
    document.documentElement.style.fontSize = `${BASE_FONT * scale}px`;
  }, [scale]);

  return (
    <div className="relative w-32 md:w-44">
      <select
        id="text-scale"
        value={String(scale)}
        onChange={(e) => handleToggleTextScale(e)}
        className="w-full px-3 py-2 pr-10 text-sm 
        rounded-lg border border-[var(--border)]
        bg-[var(--background)] text-[var(--text)]
        shadow-sm outline-none 
        appearance-none"
      >
        {SCALE_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="rounded-md bg-[var(--background)] text-[var(--text)]"
          >
            {opt.label}
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

export default TextScaler;
