import { ArrowLeft, Download, Plus, Trash, UserPen } from "lucide-react";

const UserAdditionalDetailsHeader = ({ step, setStep, setOpenDialog }) => {
  const handleDeleteUser = () => {
    setOpenDialog(true);
  };
  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between px-1.5 py-1.5 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div
          onClick={() => setStep(1)}
          className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
        >
          <ArrowLeft size={15} className="text-gray-800" />
        </div>
        <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg">
          {step === 2
            ? "Additional Details"
            : step === 4
            ? "Add User"
            : "Update User"}
        </h2>
      </div>
      <div className="flex">
        <div className="flex space-x-2 py-1 px-0">
          {step !== 4 && (
            <div className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm">
              <Plus
                onClick={() => setStep(4)}
                size={15}
                className="text-gray-800"
              />
            </div>
          )}
          {step !== 4 && step !== 3 && (
            <div
              onClick={() => setStep(3)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
            >
              <UserPen size={15} className="text-gray-800" />
            </div>
          )}
          {step !== 4 && step !== 3 && (
            <div
              onClick={handleDeleteUser}
              className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
            >
              <Trash size={15} className="text-gray-800" />
            </div>
          )}

          {step === 2 && (
            <div className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm">
              <Download size={15} className="text-gray-800" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAdditionalDetailsHeader;
