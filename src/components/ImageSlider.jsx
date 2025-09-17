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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/2 backdrop-blur-sm">
        <div className="relative">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="cursor-pointer absolute top-1 right-1 z-30 bg-white/30 backdrop-blur-md transition-colors duration-300 p-2 rounded-full shadow-lg"
          >
            <X className="w-4 h-4 text-gray-800" />
          </button>

          <div className="flex items-center justify-center h-[70vh] bg-transparent rounded-lg overflow-hidden">
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
            className="cursor-pointer absolute left-[-1.4rem] top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              setSelectedIndex((selectedIndex + 1) % images.length)
            }
            aria-label="Next"
            className="cursor-pointer absolute right-[-1.4rem] top-1/2 -translate-y-1/2 z-40 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
