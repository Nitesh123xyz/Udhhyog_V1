import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const UpDownBtn = () => {
  const [show, SetShow] = useState(false);

  //   ---------------------------------

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        SetShow(true);
      } else {
        SetShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 cursor-pointer bg-amber-400 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-linear ${
          show ? "" : "hidden"
        }`}
      >
        <ArrowUp size={22} />
      </div>
    </>
  );
};

export default UpDownBtn;
