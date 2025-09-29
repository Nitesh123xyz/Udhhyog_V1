import { useEffect, useState } from "react";
import { getAppScale, setAppScale } from "../utils/StoreSessionInfo";
import { ChevronDown } from "lucide-react";

const BASE_FONT = 16;

const SCALE_OPTIONS = [
  { label: "Default", value: 1 },
  { label: "A+", value: 1.3 },
  { label: "A-", value: 0.88 },
];

const TextScaler = () => {
  const [scale, setScale] = useState(() => getAppScale());

  useEffect(() => {
    document.documentElement.style.setProperty("--app-scale", String(scale));
    document.documentElement.style.fontSize = `${BASE_FONT * scale}px`;

    setAppScale(scale);
  }, [scale]);

  return (
    <div className="relative w-32 md:w-44">
      <select
        id="text-scale"
        value={String(scale)}
        onChange={(e) => setScale(parseFloat(e.target.value))}
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
