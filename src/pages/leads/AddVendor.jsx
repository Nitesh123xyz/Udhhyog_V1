import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Building,
  Mail,
  Phone,
  FileText,
  Hash,
  X,
  MessageSquare,
  Calendar,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAddLeadsMutation } from "../../features/leads/leadsSlice";
import useAuth from "../../hooks/useAuth";

const statusOptions = ["pending", "active", "completed", "rejected"];

const schema = z.object({
  companyname: z.string().min(1, { message: "Company name is required" }),
  number: z.string().min(10, { message: "Valid phone number is required" }),
  emailid: z.string().email({ message: "Invalid email address" }),
  source: z.string().min(1, { message: "Source ID is required" }),
  requirement: z
    .string()
    .min(1, { message: "Requirement details are required" }),
  file: z.string().min(1, { message: "File/URL is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  status: z.enum(statusOptions, { message: "Please select a status" }),
});

const AddVendor = ({ setOpenAddFrom }) => {
  const { token } = useAuth();
  const [addLead] = useAddLeadsMutation();

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
    defaultValues: {
      source: "",
      status: "pending",
      date: new Date().toISOString().split("T")[0], // Defaults to today
    },
  });

  const onFormSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        token,
        action: "add",
      };

      const { status: apiStatus } = await addLead(payload).unwrap();
      if (apiStatus === 200) {
        toast.success("Lead Added successfully!");
        reset();
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add lead");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[var(--background)] text-[var(--text)] p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-4xl mx-4 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center border-b-2 border-[var(--border)] inline-block pb-1 uppercase">
            Add New Lead
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-0 right-0 p-2 rounded-full bg-[var(--border)] text-[var(--text)] hover:opacity-80 transition-opacity"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
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

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Phone Number
              </label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Phone className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  {...register("number")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message}
                </p>
              )}
            </div>

            {/* Email ID */}
            <div>
              <label className="block mb-2 text-sm font-medium">Email ID</label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Mail className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  {...register("emailid")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="email@example.com"
                />
              </div>
              {errors.emailid && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailid.message}
                </p>
              )}
            </div>

            {/* Source ID */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Source ID
              </label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Hash className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  type="text"
                  {...register("source")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                  placeholder="Enter numeric source ID"
                />
              </div>
              {errors.source && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.source.message}
                </p>
              )}
            </div>

            {/* Date Field */}
            <div>
              <label className="block mb-2 text-sm font-medium">Date</label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Calendar className="w-5 h-5 mx-3 text-gray-500" />
                <input
                  type="date"
                  {...register("date")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent"
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <Activity className="w-5 h-5 mx-3 text-gray-500" />
                <select
                  {...register("status")}
                  className="flex-1 py-3 pr-4 outline-none bg-transparent capitalize"
                >
                  {statusOptions.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-[var(--background)]"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Requirement */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Requirement
            </label>
            <div className="flex items-center border border-[var(--border)] rounded-lg">
              <MessageSquare className="w-5 h-5 mx-3 text-gray-500" />
              <input
                {...register("requirement")}
                className="flex-1 py-3 pr-4 outline-none bg-transparent"
                placeholder="Enter requirements"
              />
            </div>
            {errors.requirement && (
              <p className="text-red-500 text-sm mt-1">
                {errors.requirement.message}
              </p>
            )}
          </div>

          {/* File Link */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              File / Attachment Link
            </label>
            <div className="flex items-center border border-[var(--border)] rounded-lg">
              <FileText className="w-5 h-5 mx-3 text-gray-500" />
              <input
                {...register("file")}
                className="flex-1 py-3 pr-4 outline-none bg-transparent"
                placeholder="Enter file path"
              />
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-medium disabled:opacity-70 flex items-center gap-2"
            >
              {isSubmitting ? "Adding..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
