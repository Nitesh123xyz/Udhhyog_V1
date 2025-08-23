import { Download, Filter, Plus } from "lucide-react";
import UpDownBtn from "./UpDownBtn";

const CommonLayout = ({ children }) => {
  return (
    <>
      <div className="max-w-screen md:max-w-[49rem] lg:max-w-full">
        <div
          className={`bg-[var(--background)] rounded-2xl p-[0.3rem_0px_0px_0px] `}
        >
          {/* Main content area */}

          {children}

          {/* Main content area */}
        </div>

        {/* { Up Down Page Button} */}
        <UpDownBtn />
        {/* { Up Down Page Button} */}
      </div>
    </>
  );
};

export default CommonLayout;
