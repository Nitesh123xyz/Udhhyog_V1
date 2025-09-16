import toast from "react-hot-toast";
import "../css/commonLayout.css";
import { X } from "lucide-react";
export const showCustomToast = (message, icon, title = "Notification") => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } max-w-xs w-full bg-[var(--background)] shadow-lg rounded-lg relative pointer-events-auto flex border border-[var(--border)]`}
    >
      <div className="flex-1 w-0 p-2 md:p-2">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="/logo.png"
              alt="company_logo"
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2">
              <img
                className="h-5 w-5 rounded-full"
                src={icon}
                alt="company_logo"
              />
              <p className="text-sm font-medium text-[var(--text)]">{title}</p>
            </div>
            <p className="mt-1 text-sm text-[var(--text)]">{message}</p>
          </div>
        </div>
      </div>
      <div
        onClick={() => toast.dismiss(t.id)}
        className="absolute right-1.5 top-1 p-1 cursor-pointer rounded-full bg-white/10"
      >
        <X className="text-white w-3 h-3" />
      </div>
    </div>
  ));
};
