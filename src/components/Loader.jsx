const MainLoaderModal = () => {
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative flex w-full h-full items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
export default MainLoaderModal;
