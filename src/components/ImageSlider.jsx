import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = ({
  images = [],
  open,
  setOpen,
  selectedIndex = 0,
  setSelectedIndex,
}) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      >
        <div className="relative top-[-30%] sm:top-[-20%] lg:top-0  w-full  lg:max-w-[50%] px-1 sm:px-3 lg:px-0">
          <div className="flex items-center justify-center bg-transparent rounded-lg overflow-hidden">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt || `slide-${selectedIndex}`}
              className="max-h-full max-w-full object-contain rounded-lg transition-all duration-500 ease-in-out"
            />
          </div>

          <button
            onClick={() =>
              setSelectedIndex(
                (selectedIndex - 1 + images.length) % images.length
              )
            }
            aria-label="Previous"
            className="cursor-pointer absolute left-[0rem] lg:left-[-1.4rem] top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() =>
              setSelectedIndex((selectedIndex + 1) % images.length)
            }
            aria-label="Next"
            className="cursor-pointer absolute right-[0rem] lg:right-[-1.4rem] top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-full shadow-lg"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
