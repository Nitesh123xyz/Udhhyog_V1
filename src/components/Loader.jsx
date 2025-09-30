// MainLoaderModal.jsx
const MainLoaderModal = () => {
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative flex w-full h-full items-center justify-center">
        {/* <img
          src="https://cdn.pixabay.com/animation/2023/05/16/19/39/19-39-22-509_512.gif"
          alt="loader"
          className=" object-contain"
        /> */}
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
export default MainLoaderModal;
