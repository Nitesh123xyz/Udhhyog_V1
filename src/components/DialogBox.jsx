const DialogBox = ({
  setOpenDialog,
  setConfirmation,
  setEnableDeleteBtn,
  message,
  title = "Delete User",
}) => {
  return (
    <div className="fixed top-1/6 lg:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-full max-w-md px-4 lg:-px-0">
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg">
        <div className="pt-6 px-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="pl-3">
              <div className="flex items-start gap-2">
                <img
                  className="max-w-[1.6rem] max-h-[1.6rem]"
                  src="error.gif"
                  alt="error"
                />
                <h2 className="text-lg font-semibold text-[var(--text)] mb-1">
                  {title}
                </h2>
              </div>
              {message}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[var(--background)] rounded-b-lg flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-end sm:space-x-3">
          <button
            onClick={() => setOpenDialog(false)}
            className="cursor-pointer w-full sm:w-auto px-4 py-2 text-sm font-medium text-[var(--text)]  border border-[var(--border)] rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setEnableDeleteBtn(true);
              setOpenDialog(false);
            }}
            className="cursor-pointer w-full sm:w-auto px-4 py-2 text-sm font-medium text-[var(--text)]  border border-[var(--border)] rounded-md"
          >
            Enable Delete
          </button>
          <button
            onClick={() => {
              setConfirmation(true);
              setOpenDialog(false);
            }}
            className="cursor-pointer w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
