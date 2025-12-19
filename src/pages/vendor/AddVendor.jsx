import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Building,
  Mail,
  Clock,
  FileText,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAddVendorMutation } from "../../features/vendor/vendorSlice";
import useAuth from "../../hooks/useAuth";

const companyTypes = [
  "retailer",
  "manufacturer",
  "distributor",
  "trader",
  "transporter",
];

const schema = z.object({
  companyname: z.string().min(1, { message: "Company name is required" }),
  com_type: z.enum(companyTypes, {
    message: "Please select a valid company type",
  }),
  com_emailid: z.string().email({ message: "Invalid email address" }),
  credittime: z
    .string()
    .regex(/^\d+$/, { message: "Credit time must be a number" }),
  com_gst: z.string().min(1, { message: "GST is required" }),
});

function AddVendorModal({ setOpenAddFrom }) {
  const { token } = useAuth();
  const [AddVendor] = useAddVendorMutation();

  const onClose = () => {
    setOpenAddFrom(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onFormSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        token,
        action: "add",
        subaction: "basic_vendor",
      };

      const { status } = await AddVendor(payload).unwrap();
      if (status === 200) {
        toast.success("Vendor Added successfully!");
        reset();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add vendor");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[var(--background)] text-[var(--text)] p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center border-b-2 border-[var(--border)] inline-block pb-1 uppercase">
            Add Vendor
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-0 right-0 p-2 rounded-full bg-[var(--border)] text-[var(--text)] hover:opacity-80 transition-opacity"
            aria-label="Close modal"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Name
              </label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Building className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  {...register("companyname")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="Enter company name"
                />
              </div>
              {errors.companyname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyname.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Type
              </label>
              <div className="relative">
                <select
                  {...register("com_type")}
                  className="w-full appearance-none bg-transparent border border-[var(--border)] rounded-lg px-3 py-3 pl-12 pr-10 text-[var(--text)] outline-0 cursor-pointer transition-all"
                >
                  <option className="bg-[var(--background)]" value="">
                    Select Company Type
                  </option>
                  {companyTypes.map((type) => (
                    <option
                      className="bg-[var(--background)]"
                      key={type}
                      value={type}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>

              {errors.com_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.com_type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Email
              </label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Mail className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  {...register("com_emailid")}
                  type="email"
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="Enter company email"
                />
              </div>
              {errors.com_emailid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.com_emailid.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Credit Time (days)
              </label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Clock className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  {...register("credittime")}
                  type="text"
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="e.g., 45"
                />
              </div>
              {errors.credittime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.credittime.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Company GST Number
            </label>
            <div className="flex items-center border border-[var(--border)] rounded-lg">
              <FileText className="w-5 h-5 mx-3 text-gray-500" />
              <input
                {...register("com_gst")}
                className="flex-1 py-3 pr-4 outline-none bg-transparent"
                placeholder="Enter GST number"
              />
            </div>
            {errors.com_gst && (
              <p className="text-red-500 text-sm mt-1">
                {errors.com_gst.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Vendor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVendorModal;
