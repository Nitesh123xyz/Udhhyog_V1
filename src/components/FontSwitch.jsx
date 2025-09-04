import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const FONT_CLASSES = {
  Outfit: "font-first",
  Inter: "font-second",
  Poppins: "font-third",
  "Old Standard TT": "font-fourth",
};

const FontSwitch = () => {
  const [font, setFont] = useState(
    () => localStorage.getItem("app-font") || "Outfit"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...Object.values(FONT_CLASSES));
    root.classList.add(FONT_CLASSES[font]);
    localStorage.setItem("app-font", font);
  }, [font]);

  return (
    <div className="relative w-32 md:w-44">
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
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
