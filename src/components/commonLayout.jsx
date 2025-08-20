import { Download, Filter, Plus } from "lucide-react";
import UpDownBtn from "./UpDownBtn";

const CommonLayout = ({ children }) => {
  return (
    <>
      <div className="max-w-screen md:max-w-[49rem] lg:max-w-full">
        <div className="">
          <div className="">
            {/* <div
              className={`absolute top-1 right-1 flex space-x-3 z-10 py-1 px-1 rounded-2xl shadow-sm`}
            >
              <div className="w-9 h-9 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/50 transition">
                <Plus className="w-4  h-4 text-gray-800" />
              </div>
              <div className="w-9 h-9 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/50 transition">
                <Filter className="w-4  h-4 text-gray-800" />
              </div>
              <div className="w-9 h-9 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm hover:bg-white/50 transition">
                <Download className="w-4  h-4 text-gray-800" />
              </div>
            </div> */}

            <div
              className={`bg-[#f5f5f5] dark:bg-gray-800 rounded-2xl p-[0.3rem_0px_0px_0px] `}
            >
              {/* Main content area */}

              {children}

              {/* Main content area */}
            </div>
          </div>
        </div>
        {/* { Up Down Page Button} */}
        <UpDownBtn />
        {/* { Up Down Page Button} */}
      </div>
    </>
  );
};

export default CommonLayout;
