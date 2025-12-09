import { Plus } from "lucide-react";

const DepartmentHeader = ({ openAddModal = () => {} }) => {
  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between px-1.5 py-1.5 transition-all duration-300">
      <div className="flex items-center gap-3 ml-1">
        <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg">
          DepartMent
        </h2>
      </div>
      <div className="flex">
        <div className="flex space-x-2 py-1 px-0">
          <div
            onClick={openAddModal}
            className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
          >
            <Plus size={15} className="text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeader;
