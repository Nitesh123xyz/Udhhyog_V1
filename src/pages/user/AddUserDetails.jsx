import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Briefcase,
  Building2,
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
  BadgeIndianRupee,
  Send,
  KeyRound,
  Gem,
  ArrowDown,
} from "lucide-react";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import UserAdditionalDetailsHeader from "../../components/UserAdditionalDetailsHeader";
import { useAddUserMutation } from "../../features/users/usersSlice";
import {
  useListDepartMentQuery,
  useListTeamQuery,
} from "../../features/utils/utilsSlice";
import toast from "react-hot-toast";
import "../../css/commonLayout.css";
import {
  BLOOD_GROUP,
  JOB_STATUSES,
  JOB_TITLES,
  MARITAL_STATUSES,
} from "../../utils/ReuseData";
import Loader from "../../components/Loader";
/* ----------------------------- Zod schemas ----------------------------- */

const documentSchema = z.object({
  doc_type: z.string().optional(),
  number: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")).optional(),
});

const emergencyContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(25, "name must be at most 25 character"),
  relation: z
    .string()
    .min(1, "Relation required")
    .max(25, "Relation must be at most 25 character"),
  phone_no: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
});

const educationSchema = z.object({
  degree: z
    .string()
    .min(1, "Degree is required")
    .max(50, "Degree must be at most 10 character"),
  university: z
    .string()
    .min(1, "University is required")
    .max(50, "University must be at most 10 character"),
  result: z
    .string()
    .min(1, "Institute is required")
    .max(50, "Institute must be at most 10 character"),
  year: z.coerce
    .number()
    .int()
    .refine((v) => /^\d{4}$/.test(String(v)), {
      message: "Year must be 4 digits (e.g. 2011)",
    })
    .min(1900, "Year looks invalid")
    .max(new Date().getFullYear() + 5, "Year looks invalid"),
});

const familySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(25, "name must be at most 25 characters"),
  relation: z
    .string()
    .min(1, "Relation required")
    .max(25, "Relation must be at most 25 characters"),
  phone_no: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
  occupation: z
    .string()
    .min(1, "Occupation is required")
    .max(50, "Phone number must be at most 50 characters"),
});

const experienceSchema = z.object({
  company: z
    .string()
    .min(1, "Company is required")
    .max(50, "Company must be at most 50 characters"),
  role: z
    .string()
    .min(1, "role is required")
    .max(50, "Role must be at most 50 characters"),
  start_date: z.string().min(1, "start date is required"),
  end_date: z.string().min(1, "end date is required"),
  year: z.number().default(2001),
});

/* ----------------------------- Main schema ----------------------------- */

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().optional(),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,}$/,
      "Password must include One uppercase, lowercase, number & One special character"
    ),
  id_department: z.number().min(1, "Department is required"),
  team_id: z.number().min(1, "Team is required"),
  joining_date: z.string().min(1, "Joining date is required"),
  whatsapp_no: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
  marital_status: z.string().min(1, "Marital status is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(128, "Address must be at most 128 character"),
  job_title: z.string().min(1, "Job title required"),
  job_status: z.string().min(1, "Job status required"),
  phone_no: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  blood_group: z.string().min(1, "Blood group is required"),
  salary: z.number().min(1, "Salary is required"),
  incentive: z.number().optional(),
  acc_no: z
    .string()
    .min(5, "Account Number must be at least 5 digits")
    .max(25, "Account number must be at most 25 digits"),
  bank_name: z
    .string()
    .min(1, "Bank name is required")
    .max(20, "Bank name must be at most 20 character"),
  ifsc_no: z
    .string()
    .min(1, "IFSC number is required")
    .max(11, "IFSC number be at most 11 digits"),
  email: z.string().email("Invalid email address"),
  accholder: z
    .string()
    .min(1, "Account holder name is required")
    .max(25, "Account holder name must be at most 25 character"),
  branchname: z
    .string()
    .min(1, "Branch name is required")
    .max(128, "Branch name must be at most 128 character"),
  document: z.array(documentSchema).optional(),
  ec: z.array(emergencyContactSchema).min(1),
  education: z.array(educationSchema).min(1),
  family: z.array(familySchema).min(1),
  experience: z.array(experienceSchema).min(1),
});

/* ---------------------------- dummy data --------------------------- */

const Documents = [
  { type: "PAN", doc: "", url: "", require: true },
  { type: "Aadhaar", doc: "", url: "", require: true },
  { type: "Passport", doc: "", url: "", require: false },
  { type: "Bank Account", doc: "", url: "", require: false },
];

/* -------------------------- Default values --------------------------- */

const defaultValues = {
  firstname: "",
  lastname: "",
  password: "",
  team_id: 0,
  id_department: 0,
  joining_date: "",
  whatsapp_no: "",
  marital_status: "",
  address: "",
  job_title: "",
  job_status: "",
  phone_no: "",
  dob: "",
  blood_group: "",
  salary: null,
  incentive: null,
  acc_no: "",
  bank_name: "",
  ifsc_no: "",
  email: "",
  accholder: "",
  branchname: "",

  document: Documents?.map((d) => ({
    doc_type: d.type,
    number: "",
    url: "",
  })),
  ec: [{ name: "", relation: "", phone_no: "" }],
  education: [{ degree: "", university: "", result: "", year: null }],
  family: [{ name: "", relation: "", phone_no: "", occupation: "" }],
  experience: [{ company: "", role: "", start_date: "", end_date: "" }],
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
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-3 border rounded-lg bg-[var(--background)] outline-none appearance-none
      ${error ? "border-red-500" : "border-[var(--border)]"}`}
        >
          <option value="">Select {label}</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-light)]">
          <ArrowDown size={16} />
        </span>
      </div>
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

const AddUserDetails = ({ step, setStep }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [addUserDetailsInformation, { isLoading }] = useAddUserMutation();
  const { token } = useAuth();
  const { data } = useListDepartMentQuery(token);
  const { data: teamListData } = useListTeamQuery(token);
  const { team_data = [] } = teamListData?.body || {};
  const { dep_data = [] } = data?.body || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  /* ------- field arrays ------- */
  const docsFA = useFieldArray({ control, name: "document" });
  const emergFA = useFieldArray({ control, name: "ec" });
  const eduFA = useFieldArray({ control, name: "education" });
  const famFA = useFieldArray({ control, name: "family" });
  const expFA = useFieldArray({ control, name: "experience" });

  const tabs = useMemo(
    () => [
      { id: "basic", label: "Basic Info", icon: User },
      { id: "documents", label: "Documents", icon: CreditCard },
      { id: "emergency", label: "Emergency", icon: Heart },
      { id: "education", label: "Education", icon: GraduationCap },
      { id: "family", label: "Family", icon: Users },
      { id: "experience", label: "Experience", icon: Briefcase },
    ],
    []
  );

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
          // basic
          !!vals.firstname &&
          !!vals.password &&
          !!vals.job_title &&
          !!vals.job_status &&
          !!vals.joining_date &&
          !!vals.team_id &&
          !!vals.id_department &&
          vals.salary > 0 &&
          // contact
          !!vals.email &&
          !!vals.phone_no &&
          !!vals.whatsapp_no &&
          !!vals.dob &&
          !!vals.marital_status &&
          !!vals.blood_group &&
          !!vals.address &&
          // bank
          !!vals.accholder &&
          !!vals.bank_name &&
          !!vals.acc_no &&
          !!vals.ifsc_no &&
          !!vals.branchname
        );
      case "documents":
        return (
          Array.isArray(vals.document) &&
          vals.document.length > 0 &&
          (!!vals.document[0]?.doc_type ||
            !!vals.document[0]?.number ||
            !!vals.document[0]?.url)
        );
      case "emergency":
        return (
          Array.isArray(vals.ec) &&
          vals.ec.length > 0 &&
          !!vals.ec[0]?.name &&
          !!vals.ec[0]?.relation &&
          !!vals.ec[0]?.phone_no
        );
      case "education":
        return (
          Array.isArray(vals.education) &&
          vals.education.length > 0 &&
          !!vals.education[0]?.degree &&
          !!vals.education[0]?.university
        );
      case "family":
        return (
          Array.isArray(vals.family) &&
          vals.family.length > 0 &&
          !!vals.family[0]?.name &&
          !!vals.family[0]?.relation
        );
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
    basic: [
      "firstname",
      "lastname",
      "password",
      "job_title",
      "job_status",
      "joining_date",
      "team_id",
      "id_department",
      "salary",
      "incentive",
      // contact
      "email",
      "phone_no",
      "whatsapp_no",
      "dob",
      "marital_status",
      "blood_group",
      "address",
      // bank
      "accholder",
      "bank_name",
      "acc_no",
      "ifsc_no",
      "branchname",
    ],
    document: ["document"],
    emergency: ["ec"],
    education: ["education"],
    family: ["family"],
    experience: ["experience"],
  };

  /* ----------------------- submit ---------------------- */

  const onSubmit = async (data) => {
    try {
      const result = await addUserDetailsInformation({
        ...data,
        token: token,
      }).unwrap();

      if (result?.status === 200) {
        toast.success("User Added Successfully");
        setStep(1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data);
    }
  };

  const watchedValues = watch();

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
  }, [isCurrentTabFilled, nextTabId]);

  const handleNext = async () => {
    const fields = fieldsToValidateForTab[activeTab] || [];
    const valid = await trigger(fields);
    if (valid && nextTabId) {
      enableTab(nextTabId);
      setActiveTab(nextTabId);
    }
  };

  const handleBack = () => {
    if (prevTabId) setActiveTab(prevTabId);
  };

  /* --------------------------- Render UI ----------------------------- */

  if (isLoading) {
    return <Loader />;
  }
  /* --------------------------- Render UI ----------------------------- */

  return (
    <section className="max-full mx-auto">
      <div className="flex justify-end gap-3">
        <UserAdditionalDetailsHeader step={step} setStep={setStep} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[var(--background)] min-h-screen lg:min-h-[calc(100vh-105px)] shadow-xl 2xl:rounded-b-lg"
      >
        {/* Tabs */}
        <div className="border-[var(--border)] overflow-x-auto">
          <nav className="flex flex-wrap">
            {tabs.map((tab) => {
              const enabled = isTabEnabled(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => enabled && setActiveTab(tab.id)}
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

        <div className="p-4 sm:p-x-8 sm:py-2">
          {activeTab === "basic" && (
            <div className="space-y-6">
              {/* Basic */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] my-2">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                  <Controller
                    control={control}
                    name="firstname"
                    render={({ field }) => (
                      <InputField
                        label="First Name"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={User}
                        error={errors?.firstname?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastname"
                    render={({ field }) => (
                      <InputField
                        label="Last Name"
                        value={field.value}
                        onChange={field.onChange}
                        Icon={User}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <InputField
                        label="Password"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={KeyRound}
                        error={errors?.password?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="job_title"
                    render={({ field }) => (
                      <InputField
                        label="Job Title"
                        value={field.value}
                        onChange={field.onChange}
                        options={JOB_TITLES}
                        required
                        Icon={Briefcase}
                        error={errors?.job_title?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="job_status"
                    render={({ field }) => (
                      <InputField
                        label="Job Status"
                        value={field.value}
                        onChange={field.onChange}
                        options={JOB_STATUSES}
                        required
                        Icon={Briefcase}
                        error={errors?.job_status?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="joining_date"
                    render={({ field }) => (
                      <InputField
                        label="Joining Date"
                        value={field.value}
                        onChange={field.onChange}
                        type="date"
                        required
                        Icon={Briefcase}
                        error={errors?.joining_date?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="team_id"
                    render={({ field }) => {
                      const selectedDep = team_data.find(
                        (dep) => dep?.team_id === field.value
                      );
                      return (
                        <InputField
                          label="Team"
                          value={selectedDep?.name ?? ""}
                          onChange={(selectedName) => {
                            const team = team_data?.find(
                              (d) => d.name === selectedName
                            );
                            field.onChange(team ? team.team_id : 0);
                          }}
                          options={team_data?.map((d) => d?.name)}
                          required
                          Icon={Building2}
                          error={errors?.team_id?.message}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="id_department"
                    render={({ field }) => {
                      const selectedDep = dep_data.find(
                        (dep) => dep.dep_id === field.value
                      );
                      return (
                        <InputField
                          label="Department"
                          value={selectedDep?.department ?? ""}
                          onChange={(selectedName) => {
                            const dep = dep_data.find(
                              (d) => d.department === selectedName
                            );
                            field.onChange(dep ? dep.dep_id : 0);
                          }}
                          options={dep_data.map((d) => d.department)}
                          required
                          Icon={Building2}
                          error={errors?.id_department?.message}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="salary"
                    render={({ field }) => (
                      <InputField
                        label="Salary"
                        value={field.value}
                        onChange={(val) => field.onChange(Number(val))}
                        type="number"
                        required
                        Icon={BadgeIndianRupee}
                        error={errors?.salary?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="incentive"
                    render={({ field }) => (
                      <InputField
                        label="Incentive"
                        value={field.value}
                        onChange={(val) => field.onChange(Number(val))}
                        type="number"
                        Icon={BadgeIndianRupee}
                        error={errors?.incentive?.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-2">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <InputField
                        label="Email Address"
                        value={field.value}
                        onChange={field.onChange}
                        type="email"
                        required
                        Icon={Mail}
                        error={errors?.email?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="phone_no"
                    render={({ field }) => (
                      <InputField
                        label="Phone Number"
                        value={field.value}
                        onChange={field.onChange}
                        type="tel"
                        required
                        Icon={Phone}
                        error={errors?.phone_no?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="whatsapp_no"
                    render={({ field }) => (
                      <InputField
                        label="WhatsApp Number"
                        value={field.value}
                        onChange={field.onChange}
                        type="tel"
                        required
                        Icon={Phone}
                        error={errors?.whatsapp_no?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <InputField
                        label="Date of Birth"
                        value={field.value}
                        onChange={field.onChange}
                        type="date"
                        required
                        Icon={Calendar}
                        error={errors?.dob?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="marital_status"
                    render={({ field }) => (
                      <InputField
                        label="Marital Status"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        options={MARITAL_STATUSES}
                        Icon={Gem}
                        error={errors?.marital_status?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="blood_group"
                    render={({ field }) => (
                      <InputField
                        label="Blood Group"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={Droplets}
                        options={BLOOD_GROUP}
                        error={errors?.blood_group?.message}
                      />
                    )}
                  />
                  <div className="sm:col-span-2 lg:col-span-3">
                    <Controller
                      control={control}
                      name="address"
                      render={({ field }) => (
                        <InputField
                          label="Address"
                          value={field.value}
                          onChange={field.onChange}
                          type="textarea"
                          required
                          Icon={Home}
                          error={errors?.address?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-2">
                  Bank Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-[var(--text)]">
                  <Controller
                    control={control}
                    name="accholder"
                    render={({ field }) => (
                      <InputField
                        label="Account Holder Name"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={User}
                        error={errors?.accholder?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="bank_name"
                    render={({ field }) => (
                      <InputField
                        label="Bank Name"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={Landmark}
                        error={errors?.bank_name?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="acc_no"
                    render={({ field }) => (
                      <InputField
                        label="Account Number"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={Landmark}
                        error={errors?.acc_no?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="ifsc_no"
                    render={({ field }) => (
                      <InputField
                        label="IFSC Code"
                        value={field.value}
                        onChange={field.onChange}
                        required
                        Icon={Landmark}
                        error={errors?.ifsc_no?.message}
                      />
                    )}
                  />
                  <div className="sm:col-span-2 lg:col-span-3">
                    <Controller
                      control={control}
                      name="branchname"
                      render={({ field }) => (
                        <InputField
                          label="Branch Address"
                          value={field.value}
                          onChange={field.onChange}
                          required
                          type="textarea"
                          Icon={Home}
                          error={errors?.branchname?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Documents
                </h2>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[var(--text)]">
                      <Controller
                        control={control}
                        name={`document.${index}.doc_type`}
                        render={({ field }) => (
                          <InputField
                            label="Document Type"
                            value={field.value || Documents[index]?.type || ""}
                            onChange={field.onChange}
                            required={Documents[index]?.require}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`document.${index}.number`}
                        render={({ field }) => (
                          <InputField
                            label="Document Number"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`document.${index}.url`}
                        render={({ field }) => (
                          <InputField
                            label="Document URL"
                            value={field.value}
                            onChange={field.onChange}
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

          {activeTab === "emergency" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Emergency Contacts
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    emergFA.append({ name: "", relation: "", phone_no: "" })
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
                        name={`ec.${index}.name`}
                        render={({ field }) => (
                          <InputField
                            label="Name"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            Icon={User}
                            error={errors?.ec?.[index]?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`ec.${index}.relation`}
                        render={({ field }) => (
                          <InputField
                            label="Relation"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            error={errors?.ec?.[index]?.relation?.message}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`ec.${index}.phone_no`}
                        render={({ field }) => (
                          <InputField
                            label="Phone"
                            value={field.value}
                            onChange={field.onChange}
                            type="tel"
                            required
                            Icon={Phone}
                            error={errors?.ec?.[index]?.phone_no?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                  Education
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    eduFA.append({
                      degree: "",
                      university: "",
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
                            error={errors?.education?.[index]?.degree?.message}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`education.${index}.university`}
                        render={({ field }) => (
                          <InputField
                            label="University"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            error={
                              errors?.education?.[index]?.university?.message
                            }
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
                            required
                            onChange={field.onChange}
                            error={errors?.education?.[index]?.result?.message}
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
                            required
                            onChange={(val) => {
                              const raw =
                                typeof val === "object" && val?.target
                                  ? val.target.value
                                  : val;
                              const num = Number(raw);
                              field.onChange(
                                Number.isFinite(num) ? Math.trunc(num) : 0
                              );
                            }}
                            type="number"
                            error={errors?.education?.[index]?.year?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                      phone_no: "",
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
                      <h3 className="font-medium text-[var(--text)]">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--text)]">
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
                            error={errors?.family?.[index]?.name?.message}
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
                            error={errors?.family?.[index]?.relation?.message}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`family.${index}.phone_no`}
                        render={({ field }) => (
                          <InputField
                            label="Phone"
                            value={field.value}
                            onChange={field.onChange}
                            type="tel"
                            required
                            Icon={Phone}
                            error={errors?.family?.[index]?.phone_no?.message}
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
                            required
                            onChange={field.onChange}
                            error={errors?.family?.[index]?.occupation?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                      start_date: "",
                      end_date: "",
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[var(--text)]">
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
                            error={
                              errors?.experience?.[index]?.company?.message
                            }
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
                            error={errors?.experience?.[index]?.role?.message}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.start_date`}
                        render={({ field }) => (
                          <InputField
                            label="Start Date"
                            value={field.value}
                            onChange={field.onChange}
                            type="date"
                            required
                            Icon={Calendar}
                            error={
                              errors?.experience?.[index]?.start_date?.message
                            }
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`experience.${index}.end_date`}
                        render={({ field }) => (
                          <InputField
                            label="End Date"
                            value={field.value}
                            onChange={field.onChange}
                            required
                            type="date"
                            Icon={Calendar}
                            error={
                              errors?.experience?.[index]?.end_date?.message
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

          <div className="mt-8 pt-4 border-t border-[var(--border)]">
            <div className="flex justify-end gap-2">
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
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-2 py-3 sm:px-8 rounded-lg font-semibold ${
                    isCurrentTabFilled
                      ? "border border-[var(--border)] text-[var(--text)] cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed border border-[var(--border)]"
                  }`}
                >
                  Next
                </button>
              )}

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
