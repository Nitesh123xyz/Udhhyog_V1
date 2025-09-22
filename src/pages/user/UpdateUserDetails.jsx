import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { employees } from "../../utils/DummyData";
import UserAdditionalDetailsHeader from "../../components/UserAdditionalDetailsHeader";
import { Pencil, Plus, Save, X } from "lucide-react";

/* ---------------- ZOD SCHEMAS ---------------- */
const contactSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal(""))
    .nullable(),
  phone: z.string().optional().or(z.literal("")).nullable(),
  whatsapp: z.string().optional().or(z.literal("")).nullable(),
  dob: z.string().optional().nullable(),
  maritalStatus: z.string().optional().nullable(),
  bloodGroup: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

const documentSchema = z.object({
  type: z.string().min(1, "Type required"),
  doc: z.string().min(1, "Doc required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")).nullable(),
});

const educationSchema = z.object({
  degree: z.string().optional().nullable(),
  institute: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  year: z.union([z.string(), z.number()]).optional().nullable(),
});

const familySchema = z.object({
  name: z.string().optional().nullable(),
  relation: z.string().optional().nullable(),
  dob: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
});

const experienceSchema = z.object({
  company: z.string().min(1, "Company required"),
  role: z.string().min(1, "Role required"),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
});

const bankSchema = z.object({
  accountHolder: z.string().optional().nullable(),
  bankName: z.string().optional().nullable(),
  accountNumber: z.string().optional().nullable(),
  ifsc: z.string().optional().nullable(),
  branch: z.string().optional().nullable(),
  upi: z.string().optional().nullable(),
});

const formSchema = z
  .object({
    id: z.any().optional().nullable(),
    name: z.string().min(1, "Name is required"),
    jobTitle: z.string().optional().nullable(),
    department: z.string().optional().nullable(),
    site: z.string().optional().nullable(),
    salary: z.string().optional().nullable(),
    startDate: z.string().optional().nullable(),
    lifecycle: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
    contact: contactSchema,
    documents: z.array(documentSchema).optional().nullable(),
    emergencyContacts: z
      .array(
        z.object({
          name: z.string().optional().nullable(),
          relation: z.string().optional().nullable(),
          phone: z.string().optional().nullable(),
        })
      )
      .optional()
      .nullable(),
    education: z.array(educationSchema).optional().nullable(),
    family: z.array(familySchema).optional().nullable(),
    bank: bankSchema.optional().nullable(),
    experience: z.array(experienceSchema).optional().nullable(),
  })
  // ensure at least one contact (email / phone / whatsapp)
  .refine(
    (data) =>
      !!(
        data.contact &&
        (data.contact.email?.toString().trim() ||
          data.contact.phone?.toString().trim() ||
          data.contact.whatsapp?.toString().trim())
      ),
    {
      message: "Please provide at least one contact: email, phone or whatsapp",
      path: ["contact"],
    }
  );

/* ---------------- COMPONENT ---------------- */
const UpdateUserDetails = ({ step, setStep, employeesId }) => {
  const employee = employees.find((e) => e.id === employeesId);

  const defaultValues = employee || {
    id: null,
    name: "",
    jobTitle: "",
    department: "",
    site: "",
    salary: "",
    startDate: "",
    lifecycle: "",
    status: "",
    avatar: "",
    contact: {
      email: "",
      phone: "",
      whatsapp: "",
      dob: "",
      maritalStatus: "",
      bloodGroup: "",
      address: "",
    },
    documents: [],
    emergencyContacts: [],
    education: [],
    family: [],
    bank: {
      accountHolder: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
      upi: "",
    },
    experience: [],
  };

  const {
    register: updateUserForm,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // field arrays
  const docsField = useFieldArray({ control, name: "documents" });
  const emField = useFieldArray({ control, name: "emergencyContacts" });
  const eduField = useFieldArray({ control, name: "education" });
  const famField = useFieldArray({ control, name: "family" });
  const expField = useFieldArray({ control, name: "experience" });

  useEffect(() => {
    // reset whenever employee changes (load)
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  const onSubmit = (data) => {
    // Mock update in imported array (same as your original behaviour)
    const idx = employees.findIndex((e) => e.id === employeesId);
    if (idx === -1) {
      alert("Employee not found.");
      return;
    }
    employees[idx] = { ...employees[idx], ...data };
    alert("Employee updated (mock).");
    setStep(1);
  };

  return (
    <section className="bg-[var(--background)] rounded-t-lg border border-[var(--border)]">
      <div className="flex justify-end gap-3 mb-3">
        <UserAdditionalDetailsHeader step={step} setStep={setStep} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 px-4 py-2">
        {/* Core profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Name *
            </label>
            <input
              {...updateUserForm("name")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Job Title
            </label>
            <input
              {...updateUserForm("jobTitle")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Department
            </label>
            <input
              {...updateUserForm("department")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Site
            </label>
            <input
              {...updateUserForm("site")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Salary
            </label>
            <input
              {...updateUserForm("salary")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Start Date
            </label>
            <input
              {...updateUserForm("startDate")}
              placeholder="e.g. Mar 13, 2023"
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Lifecycle
            </label>
            <input
              {...updateUserForm("lifecycle")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Status
            </label>
            <input
              {...updateUserForm("status")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)]">
              Avatar URL
            </label>
            <input
              {...updateUserForm("avatar")}
              className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="mt-2 p-4 rounded-lg border border-[var(--border)]">
          <h4 className="font-semibold mb-3 text-[var(--text)]">Contact</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--text)]">
            <div>
              <label className="block text-sm">Email</label>
              <input
                {...updateUserForm("contact.email")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
              {errors.contact?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm">Phone</label>
              <input
                {...updateUserForm("contact.phone")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
              {errors.contact?.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contact.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm">WhatsApp</label>
              <input
                {...updateUserForm("contact.whatsapp")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm">DOB</label>
              <input
                {...updateUserForm("contact.dob")}
                placeholder="YYYY-MM-DD"
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm">Marital Status</label>
              <input
                {...updateUserForm("contact.maritalStatus")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm">Blood Group</label>
              <input
                {...updateUserForm("contact.bloodGroup")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm">Address</label>
              <textarea
                {...updateUserForm("contact.address")}
                rows={2}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            {/* show general contact error (refine) */}
            {errors.contact && typeof errors.contact.message === "string" && (
              <p className="text-red-500 text-xs mt-1 sm:col-span-2">
                {errors.contact.message}
              </p>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text)]">Documents</h4>
            <button
              type="button"
              onClick={() => docsField.append({ type: "", doc: "", url: "" })}
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-[var(--icon_bg)]"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {docsField.fields.map((d, i) => (
              <div
                key={d.id}
                className="grid grid-cols-1  sm:grid-cols-4 gap-2 items-center"
              >
                <input
                  placeholder="Type (PAN/Aadhar)"
                  {...updateUserForm(`documents.${i}.type`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Doc (number)"
                  {...updateUserForm(`documents.${i}.doc`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="URL (image)"
                  {...updateUserForm(`documents.${i}.url`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => docsField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={14} className="text-[var(--text)]" />
                  </button>
                </div>
                {errors.documents?.[i] && (
                  <p className="text-red-500 text-xs sm:col-span-4">
                    {errors.documents[i].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text)]">
              Emergency Contacts
            </h4>
            <button
              type="button"
              onClick={() =>
                emField.append({ name: "", relation: "", phone: "" })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-[var(--icon_bg)]"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {emField.fields.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center"
              >
                <input
                  placeholder="Name"
                  {...updateUserForm(`emergencyContacts.${i}.name`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Relation"
                  {...updateUserForm(`emergencyContacts.${i}.relation`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Phone"
                  {...updateUserForm(`emergencyContacts.${i}.phone`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => emField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={14} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text)]">Education</h4>
            <button
              type="button"
              onClick={() =>
                eduField.append({
                  degree: "",
                  institute: "",
                  result: "",
                  year: "",
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-[var(--icon_bg)]"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {eduField.fields.map((e, i) => (
              <div
                key={e.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
              >
                <input
                  placeholder="Degree"
                  {...updateUserForm(`education.${i}.degree`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Institute"
                  {...updateUserForm(`education.${i}.institute`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Result"
                  {...updateUserForm(`education.${i}.result`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <div className="flex gap-2 items-center">
                  <input
                    placeholder="Year"
                    {...updateUserForm(`education.${i}.year`)}
                    className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] w-28 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => eduField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={14} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text)]">Family</h4>
            <button
              type="button"
              onClick={() =>
                famField.append({
                  name: "",
                  relation: "",
                  dob: "",
                  phone: "",
                  occupation: "",
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-[var(--icon_bg)]"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {famField.fields.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
              >
                <input
                  placeholder="Name"
                  {...updateUserForm(`family.${i}.name`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Relation"
                  {...updateUserForm(`family.${i}.relation`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="DOB"
                  {...updateUserForm(`family.${i}.dob`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <div className="flex gap-2 items-center">
                  <input
                    placeholder="Occupation"
                    {...updateUserForm(`family.${i}.occupation`)}
                    className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none w-35"
                  />
                  <button
                    type="button"
                    onClick={() => famField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={14} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank */}
        <div className="mt-2 p-4 rounded-lg border border-[var(--border)]">
          <h4 className="font-semibold mb-3 text-[var(--text)]">Bank</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--text)]">
            <div>
              <label className="block text-sm">Account Holder</label>
              <input
                {...updateUserForm("bank.accountHolder")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">Bank Name</label>
              <input
                {...updateUserForm("bank.bankName")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">Account Number</label>
              <input
                {...updateUserForm("bank.accountNumber")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">IFSC</label>
              <input
                {...updateUserForm("bank.ifsc")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">Branch</label>
              <input
                {...updateUserForm("bank.branch")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm">UPI</label>
              <input
                {...updateUserForm("bank.upi")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-[var(--text)]">Experience</h4>
            <button
              type="button"
              onClick={() =>
                expField.append({
                  company: "",
                  role: "",
                  startDate: "",
                  endDate: "",
                  year: "",
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-[var(--icon_bg)]"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {expField.fields.map((e, i) => (
              <div
                key={e.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end"
              >
                <input
                  placeholder="Company"
                  {...updateUserForm(`experience.${i}.company`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Role"
                  {...updateUserForm(`experience.${i}.role`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="Start"
                  {...updateUserForm(`experience.${i}.startDate`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <input
                  placeholder="End"
                  {...updateUserForm(`experience.${i}.endDate`)}
                  className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                />
                <div className="flex gap-2 sm:gap-3 items-center">
                  <input
                    placeholder="Years"
                    {...updateUserForm(`experience.${i}.year`)}
                    className="px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none w-25"
                  />

                  <button
                    type="button"
                    onClick={() => expField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={14} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-2 justify-self-end gap-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-4 py-2 rounded-md text-[var(--text)] border border-[var(--border)] bg-white/3 cursor-pointer hover:bg-red-100 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="button"
            // onClick={saveDraft}
            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-3 sm:px-8 rounded-lg border border-[var(--border)] text-[var(--text)]"
          >
            <Pencil size={20} /> Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUserDetails;
