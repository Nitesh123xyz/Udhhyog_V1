import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Heart,
  Droplets,
  Home,
  CreditCard,
  Landmark,
  GraduationCap,
  Users,
  Plus,
  X,
  Upload,
  Save,
  BadgeIndianRupee,
  Send,
} from "lucide-react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserAdditionalDetailsHeader from "../../components/UserAdditionalDetailsHeader";

/* ----------------------------- Zod schema ----------------------------- */
const phoneRegex = /^\+?\d{7,15}$/;
const ifscRegex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;

const documentSchema = z.object({
  type: z.string().optional(),
  doc: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")).optional(),
});
const emergencyContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relation: z.string().min(1, "Relation required"),
  phone: z.string().regex(phoneRegex, "Invalid phone").optional(),
});
const educationSchema = z.object({
  degree: z.string().optional(),
  institute: z.string().optional(),
  result: z.string().optional(),
  year: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{4}$/.test(v), {
      message: "Year must be 4 digits",
    }),
});
const familySchema = z.object({
  name: z.string().optional(),
  relation: z.string().optional(),
  dob: z.string().optional(),
  phone: z.string().optional(),
  occupation: z.string().optional(),
});
const experienceSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  year: z.string().optional(),
});
const bankSchema = z.object({
  accountHolder: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsc: z
    .string()
    .optional()
    .refine((v) => !v || ifscRegex.test(v), { message: "Invalid IFSC" }),
  branch: z.string().optional(),
  upi: z.string().optional(),
});
const contactSchema = z.object({
  email: z.string().email("Invalid email").optional(),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || phoneRegex.test(v), { message: "Invalid phone" }),
  whatsapp: z.string().optional(),
  dob: z.string().optional(),
  maritalStatus: z.string().optional(),
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title required"),
  department: z.string().min(1, "Department required"),
  site: z.string().optional(),
  salary: z.string().optional(),
  startDate: z.string().optional(),
  lifecycle: z.string().optional(),
  status: z.string().optional(),
  contact: contactSchema,
  documents: z.array(documentSchema).min(1),
  emergencyContacts: z.array(emergencyContactSchema).min(1),
  education: z.array(educationSchema).min(1),
  family: z.array(familySchema).min(1),
  bank: bankSchema,
  experience: z.array(experienceSchema).min(1),
});

/* -------------------------- Default form values ------------------------- */
const defaultValues = {
  name: "",
  jobTitle: "",
  department: "",
  site: "",
  salary: "",
  startDate: "",
  lifecycle: "Hired",
  status: "Active",
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    dob: "",
    maritalStatus: "Single",
    bloodGroup: "",
    address: "",
  },
  documents: [{ type: "PAN", doc: "", url: "" }],
  emergencyContacts: [{ name: "", relation: "", phone: "" }],
  education: [{ degree: "", institute: "", result: "", year: "" }],
  family: [{ name: "", relation: "", dob: "", phone: "", occupation: "" }],
  bank: {
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    upi: "",
  },
  experience: [{ company: "", role: "", startDate: "", endDate: "", year: "" }],
};

/* ---------------------------- Re-usable Field --------------------------- */
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  Icon,
  placeholder,
  options,
  error,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]">
      {Icon && <Icon size={16} />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>

    {options ? (
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-3 border rounded-lg bg-[var(--background)] outline-none  ${
          error ? "border-red-500" : "border-[var(--border)]"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`w-full px-3 py-3 border rounded-lg outline-none ${
          error ? "border-red-500" : "border-[var(--border)]"
        }`}
      />
    ) : (
      <div className="relative">
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-3 border rounded-lg outline-none ${
            error ? "border-red-500" : "border-[var(--border)]"
          }`}
        />
      </div>
    )}

    {error && <p className="text-xs text-red-600 mt-1">{String(error)}</p>}
  </div>
);

/* ------------------------------ Component ------------------------------- */
const DRAFT_KEY = "addUserDraft_v1";

const AddUserDetails = ({ step, setStep }) => {
  // navigation & UI state
  const [activeTab, setActiveTab] = useState("basic");
  const [showSalary] = useState(false);

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  /* ------- field arrays ------- */
  const docsFA = useFieldArray({ control, name: "documents" });
  const emergFA = useFieldArray({ control, name: "emergencyContacts" });
  const eduFA = useFieldArray({ control, name: "education" });
  const famFA = useFieldArray({ control, name: "family" });
  const expFA = useFieldArray({ control, name: "experience" });

  /* Tabs definition (ordered) */
  const tabs = useMemo(
    () => [
      { id: "basic", label: "Basic Info", icon: User },
      { id: "contact", label: "Contact", icon: Mail },
      { id: "documents", label: "Documents", icon: CreditCard },
      { id: "emergency", label: "Emergency", icon: Heart },
      { id: "education", label: "Education", icon: GraduationCap },
      { id: "family", label: "Family", icon: Users },
      { id: "bank", label: "Bank Details", icon: Landmark },
      { id: "experience", label: "Experience", icon: Briefcase },
    ],
    []
  );

  // enabledTabs state (navigation control)
  const [enabledTabs, setEnabledTabs] = useState(["basic"]);
  const enableTab = (id) =>
    setEnabledTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const isTabEnabled = (id) => enabledTabs.includes(id);

  /* ----------------- helpers to check "is section filled" ------------------ */
  const isTabFilledFromValues = (vals, tabId) => {
    if (!vals) return false;
    switch (tabId) {
      case "basic":
        return (
          !!String(vals.name ?? "").trim() &&
          !!String(vals.jobTitle ?? "").trim() &&
          !!String(vals.department ?? "").trim() &&
          !!vals.startDate
        );
      case "contact":
        return (
          (!!vals.contact?.email && String(vals.contact.email).trim()) ||
          (!!vals.contact?.phone && String(vals.contact.phone).trim()) ||
          (!!vals.contact?.address && String(vals.contact.address).trim())
        );
      case "documents":
        return (
          Array.isArray(vals.documents) &&
          vals.documents.length > 0 &&
          (!!vals.documents[0]?.type ||
            !!vals.documents[0]?.doc ||
            !!vals.documents[0]?.url)
        );
      case "emergency":
        return (
          Array.isArray(vals.emergencyContacts) &&
          vals.emergencyContacts.length > 0 &&
          !!vals.emergencyContacts[0]?.name &&
          !!vals.emergencyContacts[0]?.relation
        );
      case "education":
        return (
          Array.isArray(vals.education) &&
          vals.education.length > 0 &&
          !!vals.education[0]?.degree &&
          !!vals.education[0]?.institute
        );
      case "family":
        return (
          Array.isArray(vals.family) &&
          vals.family.length > 0 &&
          !!vals.family[0]?.name &&
          !!vals.family[0]?.relation
        );
      case "bank":
        return !!vals.bank?.accountHolder && !!vals.bank?.accountNumber;
      case "experience":
        return (
          Array.isArray(vals.experience) &&
          vals.experience.length > 0 &&
          !!vals.experience[0]?.company &&
          !!vals.experience[0]?.role
        );
      default:
        return false;
    }
  };

  const fieldsToValidateForTab = {
    basic: ["name", "jobTitle", "department", "startDate"],
    contact: [
      "contact.email",
      "contact.phone",
      "contact.address",
      "contact.dob",
      "contact.maritalStatus",
    ],
    documents: ["documents"],
    emergency: ["emergencyContacts"],
    education: ["education"],
    family: ["family"],
    bank: ["bank.accountHolder", "bank.accountNumber", "bank.ifsc", "bank.upi"],
    experience: ["experience"],
  };

  /* ------------------- draft save / restore / clear ------------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.values) {
        reset(parsed.values);

        // prefer meta.enabledTabs if saved; otherwise recompute from values
        if (Array.isArray(parsed.meta?.enabledTabs)) {
          setEnabledTabs(parsed.meta.enabledTabs);
        } else {
          const computed = ["basic"];
          tabs.forEach((t) => {
            if (t.id === "basic") return;
            if (isTabFilledFromValues(parsed.values, t.id)) computed.push(t.id);
          });
          setEnabledTabs(computed);
        }

        // restore active tab if provided and it's enabled, otherwise fall back
        const restoredTab = parsed.meta?.activeTab;
        if (
          restoredTab &&
          (parsed.meta?.enabledTabs?.includes(restoredTab) ||
            isTabEnabled(restoredTab))
        ) {
          setActiveTab(restoredTab);
        } else {
          // pick the last enabled tab so user returns to a filled/nearby tab
          const last =
            (parsed.meta?.enabledTabs &&
              parsed.meta.enabledTabs[parsed.meta.enabledTabs.length - 1]) ||
            null;
          setActiveTab(last || "basic");
        }
      }
    } catch (e) {
      console.warn("Failed to restore draft:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, tabs]);

  const saveDraft = () => {
    try {
      const payload = {
        values: getValues(),
        meta: {
          activeTab,
          enabledTabs,
          __savedAt: new Date().toISOString(),
        },
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
      alert("Draft saved locally.");
    } catch (e) {
      console.error("Error saving draft:", e);
      alert("Failed to save draft.");
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.warn("Failed to clear draft", e);
    }
  };

  /* ----------------------- submit and navigation ---------------------- */
  const onSubmit = (data) => {
    // Your API call would go here
    console.log("Validated form data:", data);
    alert("Employee data saved successfully!");
    clearDraft();
    // reset(defaultValues); // optional
  };

  const watchedValues = watch(); // live form values

  // live checks computed from watched values so UI toggles immediately
  const isCurrentTabFilled = useMemo(
    () => isTabFilledFromValues(watchedValues, activeTab),
    [watchedValues, activeTab]
  );

  const allTabsFilled = useMemo(
    () => tabs.every((t) => isTabFilledFromValues(watchedValues, t.id)),
    [watchedValues, tabs]
  );
  const lastTabId = tabs[tabs.length - 1].id;
  const lastTabFilled = useMemo(
    () => isTabFilledFromValues(watchedValues, lastTabId),
    [watchedValues, lastTabId]
  );
  const canSend = allTabsFilled && lastTabFilled;

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const nextTabId =
    currentIndex < tabs.length - 1 ? tabs[currentIndex + 1].id : null;
  const prevTabId = currentIndex > 0 ? tabs[currentIndex - 1].id : null;

  // auto-enable next tab when current tab becomes filled (does NOT navigate)
  useEffect(() => {
    if (isCurrentTabFilled && nextTabId) enableTab(nextTabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentTabFilled, nextTabId]);

  const handleNext = async () => {
    const fields = fieldsToValidateForTab[activeTab] || [];
    const valid = await trigger(fields);
    if (valid) {
      if (nextTabId) {
        enableTab(nextTabId);
        setActiveTab(nextTabId);
      }
    } else {
      // optional: scroll to first error or focus
      console.log("Validation failed for", activeTab);
    }
  };

  const handleBack = () => {
    if (prevTabId) setActiveTab(prevTabId);
  };

  /* --------------------------- Render UI ----------------------------- */
  return (
    <section className="max-full mx-auto ">
      <div className="flex justify-end gap-3">
        <UserAdditionalDetailsHeader step={step} setStep={setStep} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--background)] min-h-screen lg:min-h-[calc(100vh-105px)] shadow-xl 2xl:rounded-b-lg"
      >
        {/* Tabs */}
        <div className=" border-gray-200 overflow-x-auto">
          <nav className="flex flex-wrap">
            {tabs.map((tab) => {
              const enabled = isTabEnabled(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (enabled) setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 mt-2 ml-2 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors rounded-lg
                    ${
                      activeTab === tab.id
                        ? "text-[var(--text)] bg-[var(--permissionTable)]"
                        : enabled
                        ? "text-[var(--text)] hover:bg-[var(--permissionTable)]"
                        : "text-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  disabled={!enabled}
                >
                  <tab.icon size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-8">
          {/* BASIC */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <InputField
                      label="Full Name"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      Icon={User}
                      placeholder="Enter full name"
                      error={errors?.name?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="jobTitle"
                  render={({ field }) => (
                    <InputField
                      label="Job Title"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      Icon={Briefcase}
                      placeholder="e.g., Head of Design"
                      error={errors?.jobTitle?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="department"
                  render={({ field }) => (
                    <InputField
                      label="Department"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      Icon={Building2}
                      placeholder="e.g., Product"
                      error={errors?.department?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="site"
                  render={({ field }) => (
                    <InputField
                      label="Site/Location"
                      value={field.value}
                      onChange={field.onChange}
                      Icon={MapPin}
                      placeholder="e.g., Stockholm"
                    />
                  )}
                />

                <div>
                  <Controller
                    control={control}
                    name="salary"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]">
                          <BadgeIndianRupee size={16} />
                          Salary
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="e.g. 1,350"
                            className={`w-full px-3 py-3 border rounded-lg outline-none ${
                              errors?.salary
                                ? "border-red-500"
                                : "border-[var(--border)]"
                            }`}
                          />
                        </div>
                        {errors?.salary && (
                          <p className="text-xs text-red-600 mt-1">
                            {String(errors.salary?.message)}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <InputField
                      label="Start Date"
                      value={field.value}
                      onChange={field.onChange}
                      type="date"
                      required
                      Icon={Calendar}
                      error={errors?.startDate?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="lifecycle"
                  render={({ field }) => (
                    <InputField
                      label="Lifecycle Status"
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        "Hired",
                        "Probation",
                        "Confirmed",
                        "Notice Period",
                        "Terminated",
                      ]}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <InputField
                      label="Current Status"
                      value={field.value}
                      onChange={field.onChange}
                      options={["Active", "Inactive", "On Leave"]}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                <Controller
                  control={control}
                  name="contact.email"
                  render={({ field }) => (
                    <InputField
                      label="Email Address"
                      value={field.value}
                      onChange={field.onChange}
                      type="email"
                      required
                      Icon={Mail}
                      placeholder="john.doe@example.com"
                      error={errors?.contact?.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="contact.phone"
                  render={({ field }) => (
                    <InputField
                      label="Phone Number"
                      value={field.value}
                      onChange={field.onChange}
                      type="tel"
                      required
                      Icon={Phone}
                      placeholder="+91 98765 43210"
                      error={errors?.contact?.phone?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="contact.whatsapp"
                  render={({ field }) => (
                    <InputField
                      label="WhatsApp Number"
                      value={field.value}
                      onChange={field.onChange}
                      type="tel"
                      Icon={Phone}
                      placeholder="+91 98234 55678"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="contact.dob"
                  render={({ field }) => (
                    <InputField
                      label="Date of Birth"
                      value={field.value}
                      onChange={field.onChange}
                      type="date"
                      required
                      Icon={Calendar}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="contact.maritalStatus"
                  render={({ field }) => (
                    <InputField
                      label="Marital Status"
                      value={field.value}
                      onChange={field.onChange}
                      options={["Single", "Married", "Divorced", "Widowed"]}
                      Icon={Heart}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="contact.bloodGroup"
                  render={({ field }) => (
                    <InputField
                      label="Blood Group"
                      value={field.value}
                      onChange={field.onChange}
                      Icon={Droplets}
                      placeholder="e.g., B+"
                    />
                  )}
                />

                <div className="sm:col-span-2 lg:col-span-3">
                  <Controller
                    control={control}
                    name="contact.address"
                    render={({ field }) => (
                      <InputField
                        label="Address"
                        value={field.value}
                        onChange={field.onChange}
                        type="textarea"
                        required
                        Icon={Home}
                        placeholder="123, MG Road, New Delhi, 110001"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Documents
                </h2>
                <button
                  type="button"
                  onClick={() => docsFA.append({ type: "", doc: "", url: "" })}
                  className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {docsFA.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-[var(--border)] rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-[var(--text)]">
                        Document {index + 1}
                      </h3>
                      {docsFA.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => docsFA.remove(index)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <X size={14} className="text-[var(--text)]" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`documents.${index}.type`}
                        render={({ field }) => (
                          <InputField
                            label="Document Type"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., PAN, Aadhar, Bank"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`documents.${index}.doc`}
                        render={({ field }) => (
                          <InputField
                            label="Document Number"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Document ID/Number"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`documents.${index}.url`}
                        render={({ field }) => (
                          <InputField
                            label="Document URL"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="https://example.com/doc.pdf"
                            Icon={Upload}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMERGENCY */}
          {activeTab === "emergency" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Emergency Contacts
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    emergFA.append({ name: "", relation: "", phone: "" })
                  }
                  className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {emergFA.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-[var(--border)] rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-[var(--text)]">
                        Emergency Contact {index + 1}
                      </h3>
                      {emergFA.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => emergFA.remove(index)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <X size={14} className="text-[var(--text)]" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`emergencyContacts.${index}.name`}
                        render={({ field }) => (
                          <InputField
                            label="Name"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={User}
                            placeholder="Contact name"
                            error={
                              errors?.emergencyContacts?.[index]?.name?.message
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`emergencyContacts.${index}.relation`}
                        render={({ field }) => (
                          <InputField
                            label="Relation"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            placeholder="e.g., Brother, Sister"
                            error={
                              errors?.emergencyContacts?.[index]?.relation
                                ?.message
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`emergencyContacts.${index}.phone`}
                        render={({ field }) => (
                          <InputField
                            label="Phone"
                            value={field.value}
                            onChange={field.onChange}
                            type="tel"
                            required
                            Icon={Phone}
                            placeholder="+91 98765 43211"
                            error={
                              errors?.emergencyContacts?.[index]?.phone?.message
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Education
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    eduFA.append({
                      degree: "",
                      institute: "",
                      result: "",
                      year: "",
                    })
                  }
                  className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {eduFA.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-[var(--border)] rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-[var(--text)]">
                        Education {index + 1}
                      </h3>
                      {eduFA.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => eduFA.remove(index)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <X size={14} className="text-[var(--text)]" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`education.${index}.degree`}
                        render={({ field }) => (
                          <InputField
                            label="Degree"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={GraduationCap}
                            placeholder="e.g., B.Tech (CSE)"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`education.${index}.institute`}
                        render={({ field }) => (
                          <InputField
                            label="Institute"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            placeholder="e.g., IIT Delhi"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`education.${index}.result`}
                        render={({ field }) => (
                          <InputField
                            label="Result"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., 8.6 CGPA"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`education.${index}.year`}
                        render={({ field }) => (
                          <InputField
                            label="Year"
                            value={field.value}
                            onChange={field.onChange}
                            type="number"
                            placeholder="2011"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAMILY */}
          {activeTab === "family" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Family Details
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    famFA.append({
                      name: "",
                      relation: "",
                      dob: "",
                      phone: "",
                      occupation: "",
                    })
                  }
                  className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {famFA.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-[var(--border)] rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-gray-700">
                        Family Member {index + 1}
                      </h3>
                      {famFA.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => famFA.remove(index)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <X size={14} className="text-[var(--text)]" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`family.${index}.name`}
                        render={({ field }) => (
                          <InputField
                            label="Name"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={User}
                            placeholder="Family member name"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`family.${index}.relation`}
                        render={({ field }) => (
                          <InputField
                            label="Relation"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            placeholder="e.g., Wife, Son"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`family.${index}.dob`}
                        render={({ field }) => (
                          <InputField
                            label="Date of Birth"
                            value={field.value}
                            onChange={field.onChange}
                            type="date"
                            Icon={Calendar}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`family.${index}.phone`}
                        render={({ field }) => (
                          <InputField
                            label="Phone"
                            value={field.value}
                            onChange={field.onChange}
                            type="tel"
                            Icon={Phone}
                            placeholder="+91 98765 43212"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`family.${index}.occupation`}
                        render={({ field }) => (
                          <InputField
                            label="Occupation"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., Teacher"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BANK */}
          {activeTab === "bank" && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-6">
                Bank Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                <Controller
                  control={control}
                  name="bank.accountHolder"
                  render={({ field }) => (
                    <InputField
                      label="Account Holder Name"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      Icon={User}
                      placeholder="Account holder name"
                      error={errors?.bank?.accountHolder?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="bank.bankName"
                  render={({ field }) => (
                    <InputField
                      label="Bank Name"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      Icon={Landmark}
                      placeholder="e.g., HDFC Bank"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="bank.accountNumber"
                  render={({ field }) => (
                    <InputField
                      label="Account Number"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      placeholder="123456789012"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="bank.ifsc"
                  render={({ field }) => (
                    <InputField
                      label="IFSC Code"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      placeholder="HDFC0001234"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="bank.upi"
                  render={({ field }) => (
                    <InputField
                      label="UPI ID"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="john.doe@hdfcbank"
                    />
                  )}
                />
                <div className="sm:col-span-2 lg:col-span-3">
                  <Controller
                    control={control}
                    name="bank.branch"
                    render={({ field }) => (
                      <InputField
                        label="Branch Address"
                        value={field.value}
                        onChange={field.onChange}
                        type="textarea"
                        Icon={Home}
                        placeholder="Connaught Place, New Delhi"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Work Experience
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    expFA.append({
                      company: "",
                      role: "",
                      startDate: "",
                      endDate: "",
                      year: "",
                    })
                  }
                  className="cursor-pointer w-10 h-10 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {expFA.fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-[var(--border)] rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-[var(--text)]">
                        Experience {index + 1}
                      </h3>
                      {expFA.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => expFA.remove(index)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <X size={14} className="text-[var(--text)]" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`experience.${index}.company`}
                        render={({ field }) => (
                          <InputField
                            label="Company"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={Building2}
                            placeholder="e.g., TCS"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.role`}
                        render={({ field }) => (
                          <InputField
                            label="Role"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={Briefcase}
                            placeholder="e.g., Software Engineer"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.startDate`}
                        render={({ field }) => (
                          <InputField
                            label="Start Date"
                            value={field.value}
                            onChange={field.onChange}
                            type="date"
                            required
                            Icon={Calendar}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.endDate`}
                        render={({ field }) => (
                          <InputField
                            label="End Date"
                            value={field.value}
                            onChange={field.onChange}
                            type="date"
                            Icon={Calendar}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.year`}
                        render={({ field }) => (
                          <InputField
                            label="Duration"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="e.g., 2 years"
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* submit + nav */}
          <div className="mt-8 pt-4 border-t border-[var(--border)]">
            <div className="grid grid-cols-3 md:grid-cols-3 md:justify-self-end gap-2">
              {prevTabId && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold border border-[var(--border)] text-[var(--text)]"
                >
                  Back
                </button>
              )}

              {nextTabId && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentTabFilled}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-3 sm:px-8 rounded-lg font-semibold border border-[var(--border)]${
                    isCurrentTabFilled
                      ? "border border-[var(--border)] text-[var(--text)] cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              )}

              {/* Save Draft - visible on every tab (manual save) */}
              <button
                type="button"
                onClick={saveDraft}
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-3 sm:px-8 rounded-lg border border-[var(--border)] text-[var(--text)]"
              >
                <Save size={20} /> Draft
              </button>

              {/* Send (final submit) - enabled only when form is complete */}
              <button
                type="submit"
                disabled={!canSend}
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-3 sm:px-8 rounded-lg border border-[var(--border)] text-[var(--text)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddUserDetails;
