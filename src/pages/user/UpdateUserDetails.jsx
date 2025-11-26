import React, { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserAdditionalDetailsHeader from "../../components/UserAdditionalDetailsHeader";
import useAuth from "../../hooks/useAuth";
import {
  useUpdateUserBasicMutation,
  useUpdateUserEducationMutation,
  useUpdateUserEmergencyMutation,
  useUpdateUserExperienceMutation,
  useUpdateUserFamilyMutation,
  useUsersAdditionalDetailsQuery,
} from "../../features/users/usersSlice";
import { useListDepartMentQuery } from "../../features/utils/utilsSlice";
import toast from "react-hot-toast";
import {
  User,
  Briefcase,
  Heart,
  CreditCard,
  GraduationCap,
  Users,
  Plus,
  X,
  ArrowDown,
  Save,
} from "lucide-react";
import {
  BLOOD_GROUP,
  JOB_STATUSES,
  JOB_TITLES,
  MARITAL_STATUSES,
} from "../../utils/ReuseData";
import Loader from "../../components/Loader";
/* ---------------- ZOD SCHEMAS (form shape) ---------------- */

const documentSchema = z.object({
  type: z.string().min(1, "Type required"),
  doc: z.string().min(1, "Doc required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")).nullable(),
});

const educationSchema = z.object({
  degree: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  result: z.string().optional().nullable(),
  year: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    return Number(val);
  }, z.number().int().optional().nullable()),
});

const familySchema = z.object({
  name: z.string().optional().nullable(),
  relation: z.string().optional().nullable(),
  phone_no: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
  occupation: z.string().optional().nullable(),
});

const experienceSchema = z.object({
  company: z.string().min(1, "Company required"),
  role: z.string().min(1, "Role required"),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  year: z.number().optional().nullable(),
});

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  job_title: z.string().optional().nullable(),
  job_status: z.string().optional().nullable(),
  id_department: z.string().optional().nullable(),
  salary: z.union([z.string(), z.number()]).optional().nullable(),
  joining_date: z.string().optional().nullable(),
  marital_status: z.string().optional().nullable(),
  incentive: z.number().optional().nullable(),
  email: z.string().email("Invalid email address"),
  phone_no: z.string().optional().or(z.literal("")).nullable(),
  whatsapp_no: z.string().optional().or(z.literal("")).nullable(),
  dob: z.string().optional().nullable(),
  blood_group: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  accholder: z.string().optional().nullable(),
  bank_name: z.string().optional().nullable(),
  acc_no: z.string().optional().nullable(),
  ifsc_no: z.string().optional().nullable(),
  branchname: z.string().optional().nullable(),
  documents: z.array(documentSchema).optional().nullable(),
  emergencyContacts: z
    .array(
      z.object({
        name: z.string().optional().nullable(),
        relation: z.string().optional().nullable(),
        phone_no: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  education: z.array(educationSchema).optional().nullable(),
  family: z.array(familySchema).optional().nullable(),
  experience: z.array(experienceSchema).optional().nullable(),
});

/* ---------------- Helpers & mapping ---------------- */
const LABEL_SENTINEL = "label::";

const isLabelSentinel = (val) =>
  typeof val === "string" && val.startsWith(LABEL_SENTINEL);

const labelFromSentinel = (val) =>
  typeof val === "string" && val.startsWith(LABEL_SENTINEL)
    ? val.slice(LABEL_SENTINEL.length)
    : "";

const makeSentinel = (label) => `${LABEL_SENTINEL}${label}`;

/* ---------------- Mapping helpers ---------------- */

const mapServerToForm = (server = {}) => {
  if (!server) return null;

  const rawDepartment = server.department;
  let derivedLabel = "";
  let derivedId = null;

  if (rawDepartment && typeof rawDepartment === "object") {
    derivedId =
      rawDepartment.dep_id ??
      rawDepartment.id ??
      rawDepartment.department_id ??
      null;
    derivedLabel = rawDepartment.department ?? rawDepartment.name ?? "";
  } else if (rawDepartment !== undefined && rawDepartment !== null) {
    if (!isNaN(Number(rawDepartment))) {
      derivedId = Number(rawDepartment);
    } else {
      derivedLabel = String(rawDepartment);
    }
  }

  return {
    id: server.id ?? null,
    name: server.name ?? "",
    job_title: server.job_title ?? "",
    job_status: server.job_status ?? "",
    id_department:
      derivedId !== null && derivedId !== undefined && derivedId !== ""
        ? String(derivedId)
        : "",
    salary: server.salary ?? "",
    joining_date: server.joining_date ?? server.start_date ?? "",
    marital_status: server.marital_status ?? "",
    incentive: server.incentive ?? "",

    email: server.email ?? "",
    phone_no: server.phone_no ?? server.phone ?? "",
    whatsapp_no: server.whatsapp_no ?? server.whatsapp ?? "",
    dob: server.dob ?? "",
    blood_group: server.blood_group ?? server.bloodGroup ?? "",
    address: server.address ?? "",

    accholder: server.accholder ?? server.account_holder ?? "",
    bank_name: server.bank_name ?? "",
    acc_no: server.acc_no ?? server.accountNumber ?? "",
    ifsc_no: server.ifsc_no ?? server.ifsc ?? "",
    branchname: server.branchname ?? server.branch ?? "",

    documents:
      (server.documents &&
        Array.isArray(server.documents) &&
        server.documents.map((d) => ({
          id: d.id ?? null,
          type: d.doc_type ?? d.type ?? "",
          doc: d.number ?? d.doc ?? "",
          url: d.url ?? "",
        }))) ||
      [],
    emergencyContacts:
      (server.emergency &&
        Array.isArray(server.emergency) &&
        server.emergency.map((e) => ({
          id: e.id ?? null,
          name: e.name ?? "",
          relation: e.relation ?? "",
          phone_no: e.phone_no ?? e.phone ?? "",
        }))) ||
      [],
    education:
      (server.education &&
        Array.isArray(server.education) &&
        server.education.map((ed) => ({
          id: ed.id ?? null,
          degree: ed.degree ?? "",
          university: ed.university ?? "",
          result: ed.result ?? "",
          year:
            ed.year === null || ed.year === undefined || ed.year === ""
              ? null
              : Number(ed.year),
        }))) ||
      [],
    family:
      (server.family &&
        Array.isArray(server.family) &&
        server.family.map((f) => ({
          id: f.id ?? null,
          name: f.name ?? "",
          relation: f.relation ?? "",
          phone_no: f.phone_no ?? "",
          phone: f.phone_no ?? f.phone ?? "",
          occupation: f.occupation ?? "",
        }))) ||
      [],
    experience:
      (server.experience &&
        Array.isArray(server.experience) &&
        server.experience.map((ex) => ({
          id: ex?.id ?? null,
          company: ex.company ?? "",
          role: ex.role ?? ex.role_name ?? "",
          start_date: ex.start_date ?? "",
          end_date: ex.end_date ?? "",
          year: ex.year ?? 0,
        }))) ||
      [],
  };
};

const mapBasicFormToPayload = (form) => {
  if (!form) return {};

  const payload = {
    name: form.name ?? "",
    job_title: form.job_title ?? "",
    job_status: form.job_status ?? "",
    salary:
      typeof form.salary === "string" ? Number(form.salary) || 0 : form.salary,
    joining_date: form.joining_date ?? "",
    marital_status: form.marital_status ?? "",
    incentive: form.incentive ?? "",
    email: form.email ?? "",
    phone_no: form.phone_no ?? "",
    whatsapp_no: form.whatsapp_no ?? "",
    dob: form.dob ?? "",
    blood_group: form.blood_group ?? "",
    address: form.address ?? "",
    accholder: form.accholder ?? "",
    bank_name: form.bank_name ?? "",
    acc_no: form.acc_no ?? "",
    ifsc_no: form.ifsc_no ?? "",
    branchname: form.branchname ?? "",
  };

  const idDepRaw = form.id_department;
  if (isLabelSentinel(idDepRaw)) {
    payload.department = labelFromSentinel(idDepRaw);
  } else if (idDepRaw !== undefined && idDepRaw !== null && idDepRaw !== "") {
    payload.id_department = Number(idDepRaw);
  }

  if (isLabelSentinel(form.job_title))
    payload.job_title = labelFromSentinel(form.job_title);
  if (isLabelSentinel(form.job_status))
    payload.job_status = labelFromSentinel(form.job_status);
  if (isLabelSentinel(form.marital_status))
    payload.marital_status = labelFromSentinel(form.marital_status);

  return payload;
};

/* ---------------- COMPONENT ---------------- */
const UpdateUserDetails = ({ step, setStep, employeesId }) => {
  const { token } = useAuth();
  const { data: departMent } = useListDepartMentQuery(token);
  const { dep_data = [] } = departMent?.body || {};

  const { data, refetch } = useUsersAdditionalDetailsQuery({
    emp_id: employeesId,
    token: token,
  });

  const serverBody = data?.body ?? null;

  const defaultValues = useMemo(() => {
    if (!serverBody) {
      return {
        id: null,
        name: "",
        job_title: "",
        job_status: "",
        id_department: "",
        salary: "",
        joining_date: "",
        marital_status: "",
        incentive: null,
        email: "",
        phone_no: "",
        whatsapp_no: "",
        dob: "",
        blood_group: "",
        address: "",
        accholder: "",
        bank_name: "",
        acc_no: "",
        ifsc_no: "",
        branchname: "",
        documents: [],
        emergencyContacts: [],
        education: [],
        family: [],
        experience: [],
      };
    }
    return mapServerToForm(serverBody);
  }, [serverBody]);

  const {
    register: updateUserForm,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
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

  // reset + matching logic
  useEffect(() => {
    if (!serverBody) return;

    const mapped = mapServerToForm(serverBody);

    const serverDeptRaw =
      serverBody.department ?? serverBody.department_name ?? "";

    if (serverDeptRaw && Array.isArray(dep_data) && dep_data.length > 0) {
      const normalizedServerDept = String(serverDeptRaw).trim().toLowerCase();
      const matched = dep_data.find((d) => {
        const name = String(d?.department ?? d?.name ?? "")
          .trim()
          .toLowerCase();
        return name === normalizedServerDept;
      });

      if (matched) {
        mapped.id_department = String(matched?.dep_id ?? matched?.id ?? "");
      } else {
        if (String(serverDeptRaw).trim() !== "") {
          mapped.id_department = makeSentinel(String(serverDeptRaw).trim());
        }
      }
    }

    if (mapped.job_title) {
      const normalized = String(mapped.job_title).trim().toLowerCase();
      const matched = JOB_TITLES.find(
        (t) => t.trim().toLowerCase() === normalized
      );
      if (!matched && String(mapped.job_title).trim() !== "") {
        mapped.job_title = makeSentinel(String(mapped.job_title).trim());
      }
    }

    if (mapped.job_status) {
      const normalized = String(mapped.job_status).trim().toLowerCase();
      const matched = JOB_STATUSES.find(
        (s) => s.trim().toLowerCase() === normalized
      );
      if (!matched && String(mapped.job_status).trim() !== "") {
        mapped.job_status = makeSentinel(String(mapped.job_status).trim());
      }
    }

    if (mapped.marital_status) {
      const normalized = String(mapped.marital_status).trim().toLowerCase();
      const matched = MARITAL_STATUSES.find(
        (s) => s.trim().toLowerCase() === normalized
      );
      if (!matched && String(mapped.marital_status).trim() !== "") {
        mapped.marital_status = makeSentinel(
          String(mapped.marital_status).trim()
        );
      }
    }

    reset(mapped);
  }, [serverBody, dep_data]);

  const [updateBasic, { isLoading: BasicLoading }] =
    useUpdateUserBasicMutation();
  const [updateFamily, { isLoading: FamilyLoading }] =
    useUpdateUserFamilyMutation();
  const [updateExperience, { isLoading: ExperienceLoading }] =
    useUpdateUserExperienceMutation();
  const [updateEducation, { isLoading: EducationLoading }] =
    useUpdateUserEducationMutation();
  const [updateEmergency, { isLoading: EmergencyLoading }] =
    useUpdateUserEmergencyMutation();
  const Loading =
    BasicLoading ||
    FamilyLoading ||
    EducationLoading ||
    ExperienceLoading ||
    EmergencyLoading;
  // --------------------------------------------------------

  const UpdateUserEmergencyInformation = async (i) => {
    const updatedData = { emp_id: employeesId, token };
    const currentExp = getValues(`emergencyContacts.${i}`);
    const { id, ...payloadWithoutId } = currentExp;
    const payload = { ...updatedData, ...payloadWithoutId, row_id: id };
    try {
      const res = await updateEmergency(payload).unwrap();
      if (res?.status === 200) {
        toast.success("Education Updated");
        setStep(2);
      }
    } catch (err) {
      toast.error(err);
      console.error("Education Update failed:", err);
    }
  };
  const UpdateUserEducationInformation = async (i) => {
    const updatedData = { emp_id: employeesId, token };
    const currentExp = getValues(`education.${i}`);
    const { id, ...payloadWithoutId } = currentExp;
    const payload = { ...updatedData, ...payloadWithoutId, row_id: id };
    try {
      const res = await updateEducation(payload).unwrap();
      if (res?.status === 200) {
        toast.success("Education Updated");
        setStep(2);
      }
    } catch (err) {
      toast.error(err);
      console.error("Education Update failed:", err);
    }
  };

  const UpdateUserFamilyInformation = async (i) => {
    const updatedData = { emp_id: employeesId, token };
    const currentExp = getValues(`family.${i}`);
    const { id, ...payloadWithoutId } = currentExp;
    const payload = { ...updatedData, ...payloadWithoutId, row_id: id };
    try {
      const res = await updateFamily(payload).unwrap();
      if (res?.status === 200) {
        toast.success("Family Updated");
        setStep(2);
      }
    } catch (err) {
      toast.error(err);
      console.error("Family Update failed:", err);
    }
  };

  const UpdateUserExperienceInformation = async (i) => {
    const updatedData = { emp_id: employeesId, token };
    const currentExp = getValues(`experience.${i}`);

    const { id, ...payloadWithoutId } = currentExp;
    const payload = { ...updatedData, ...payloadWithoutId, row_id: id };
    try {
      const res = await updateExperience(payload).unwrap();
      if (res?.status === 200) {
        toast.success("Experience Updated");
        setStep(2);
      }
    } catch (err) {
      toast.error(err);
      console.error("Experience Update failed:", err);
    }
  };

  const UpdateUserBasicInformation = async (formData) => {
    const basicPayload = mapBasicFormToPayload(formData);

    const body = {
      emp_id: employeesId,
      token,
      ...basicPayload,
    };

    try {
      const res = await updateBasic(body).unwrap();
      if (res?.status === 200) {
        toast.success("Basic Information Updated");
        setStep(2);
      }
    } catch (err) {
      toast.error(err);
      console.error("Basic Information update failed:", err);
    }
  };

  // --------------------------------------------------------

  const currentIdDepartment = watch("id_department");
  const currentJobTitle = watch("job_title");
  const currentJobStatus = watch("job_status");
  const currentMarital = watch("marital_status");
  const currentBloodGroup = watch("blood_group");

  const renderSentinelOption = (value) =>
    isLabelSentinel(value) ? (
      <option value={String(value)} key="server-label">
        {labelFromSentinel(value)}
      </option>
    ) : null;

  return (
    <section className="bg-[var(--background)] rounded-t-lg border border-[var(--border)]">
      <div className="flex justify-end gap-3">
        <UserAdditionalDetailsHeader step={step} setStep={setStep} />
      </div>
      {Loading && <Loader />}
      <form
        onSubmit={handleSubmit(UpdateUserBasicInformation)}
        className="space-y-3 px-1 py-1"
      >
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <User className="text-[var(--text)]" />
            <h4 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
              Basic Information
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Name
              </label>
              <input
                {...updateUserForm("name")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Job Title
              </label>
              <div className="relative">
                <select
                  {...updateUserForm("job_title")}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text)] outline-none appearance-none"
                >
                  {renderSentinelOption(currentJobTitle)}
                  {JOB_TITLES?.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text)]">
                  <ArrowDown size={16} />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Job Status
              </label>
              <div className="relative">
                <select
                  {...updateUserForm("job_status")}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text)] outline-none appearance-none"
                >
                  {renderSentinelOption(currentJobStatus)}
                  {JOB_STATUSES?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text)]">
                  <ArrowDown size={16} />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Joining Date
              </label>
              <input
                {...updateUserForm("joining_date")}
                type="date"
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Department
              </label>
              <div className="relative">
                <select
                  {...updateUserForm("id_department")}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text)] outline-none appearance-none"
                >
                  <option value="">Select department</option>
                  {renderSentinelOption(currentIdDepartment)}
                  {dep_data.map((dep) => (
                    <option
                      key={dep?.dep_id ?? dep?.id}
                      value={String(dep?.dep_id ?? dep?.id)}
                    >
                      {dep?.department ?? dep?.name}
                    </option>
                  ))}
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text)]">
                  <ArrowDown size={16} />
                </span>
              </div>
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
                Incentive
              </label>
              <input
                {...updateUserForm("incentive", {
                  valueAsNumber: true,
                })}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">Email</label>
              <input
                {...updateUserForm("email")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                Phone Number
              </label>
              <input
                {...updateUserForm("phone_no")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                WhatsApp Number
              </label>
              <input
                {...updateUserForm("whatsapp_no")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                Date of Birth
              </label>
              <input
                {...updateUserForm("dob")}
                type="date"
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)]">
                Marital Status
              </label>
              <div className="relative">
                <select
                  {...updateUserForm("marital_status")}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text)] outline-none appearance-none"
                >
                  {renderSentinelOption(currentMarital)}
                  {MARITAL_STATUSES?.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text)]">
                  <ArrowDown size={16} />
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                Blood Group
              </label>
              <div className="relative">
                <select
                  {...updateUserForm("blood_group")}
                  className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--text)] outline-none appearance-none"
                >
                  {renderSentinelOption(currentBloodGroup)}
                  {BLOOD_GROUP?.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text)]">
                  <ArrowDown size={16} />
                </span>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm text-[var(--text)]">
                Address
              </label>
              <textarea
                {...updateUserForm("address")}
                rows={3}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            {/* Bank flat fields */}
            <div>
              <label className="block text-sm text-[var(--text)]">
                Account Holder
              </label>
              <input
                {...updateUserForm("accholder")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                Bank Name
              </label>
              <input
                {...updateUserForm("bank_name")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">
                Account Number
              </label>
              <input
                {...updateUserForm("acc_no")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">IFSC</label>
              <input
                {...updateUserForm("ifsc_no")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text)]">Branch</label>
              <input
                {...updateUserForm("branchname")}
                className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2 md:mt-0">
            <button
              type="button"
              onClick={() => {
                const values = getValues();
                UpdateUserBasicInformation(values);
              }}
              className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
            >
              <Save size={18} className="text-[var(--text)]" />
            </button>
          </div>
        </div>

        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="text-[var(--text)]" />
              <h4 className="font-semibold text-[var(--text)]">Documents</h4>
            </div>
            <button
              type="button"
              onClick={() => docsField.append({ type: "", doc: "", url: "" })}
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-green-400"
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
            <div className="flex items-center gap-2">
              <Heart className="text-[var(--text)]" />
              <h4 className="font-semibold text-[var(--text)]">
                Emergency Contacts
              </h4>
            </div>
            <button
              type="button"
              onClick={() =>
                emField.append({ name: "", relation: "", phone_no: "" })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-green-400"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {emField.fields.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Name
                  </label>
                  <input
                    {...updateUserForm(`emergencyContacts.${i}.name`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Relation
                  </label>
                  <input
                    {...updateUserForm(`emergencyContacts.${i}.relation`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Contact Number
                  </label>
                  <input
                    {...updateUserForm(`emergencyContacts.${i}.phone_no`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => UpdateUserEmergencyInformation(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <Save size={18} className="text-[var(--text)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => emField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={18} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-[var(--text)]" />
              <h4 className="font-semibold text-[var(--text)]">Education</h4>
            </div>
            <button
              type="button"
              onClick={() =>
                eduField.append({
                  degree: "",
                  university: "",
                  result: "",
                  year: 0,
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-green-400"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {eduField.fields.map((e, i) => (
              <div
                key={e.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Degree
                  </label>
                  <input
                    {...updateUserForm(`education.${i}.degree`)}
                    className="w-full px-3 mt-1 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    University
                  </label>
                  <input
                    {...updateUserForm(`education.${i}.university`)}
                    className="w-full px-3 mt-1 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Result
                  </label>
                  <input
                    {...updateUserForm(`education.${i}.result`)}
                    className="w-full px-3 mt-1 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Year
                  </label>

                  <input
                    {...updateUserForm(`education.${i}.year`, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-3 mt-1 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <button
                      type="button"
                      onClick={() => UpdateUserEducationInformation(i)}
                      className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
                    >
                      <Save size={18} className="text-[var(--text)]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => eduField.remove(i)}
                      className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                    >
                      <X size={18} className="text-[var(--text)]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-[var(--text)]" />
              <h4 className="font-semibold text-[var(--text)]">Family</h4>
            </div>
            <button
              type="button"
              onClick={() =>
                famField.append({
                  name: "",
                  relation: "",
                  phone_no: "",
                  occupation: "",
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-green-400"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {famField.fields.map((f, i) => (
              <div
                key={f.id}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Name
                  </label>
                  <input
                    {...updateUserForm(`family.${i}.name`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Relation
                  </label>
                  <input
                    {...updateUserForm(`family.${i}.relation`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Phone Number
                  </label>
                  <input
                    {...updateUserForm(`family.${i}.phone_no`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Occupation
                  </label>
                  <input
                    {...updateUserForm(`family.${i}.occupation`)}
                    className="w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => UpdateUserFamilyInformation(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <Save size={18} className="text-[var(--text)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => famField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={18} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="p-2 rounded-lg border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="text-[var(--text)]" />
              <h4 className="font-semibold text-[var(--text)]">Experience</h4>
            </div>
            <button
              type="button"
              onClick={() =>
                expField.append({
                  company: "",
                  role: "",
                  start_date: "",
                  end_date: "",
                  year: 0,
                })
              }
              className="text-sm p-2 lg:p-3 rounded-full border border-[var(--border)] text-[var(--icon_text)] bg-green-400"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {expField.fields.map((e, i) => (
              <div
                key={e.id}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Company
                  </label>
                  <input
                    {...updateUserForm(`experience.${i}.company`)}
                    className="w-full px-3 mt-1 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Role
                  </label>
                  <input
                    {...updateUserForm(`experience.${i}.role`)}
                    className="w-full px-3 py-2 mt-1 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...updateUserForm(`experience.${i}.start_date`)}
                    className="w-full px-3 py-2 mt-1 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text)]">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...updateUserForm(`experience.${i}.end_date`)}
                    className="w-full px-3 py-2 mt-1 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none"
                  />
                </div>
                <div className="flex gap-2 sm:gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => UpdateUserExperienceInformation(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <Save size={18} className="text-[var(--text)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => expField.remove(i)}
                    className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-red-400 backdrop-blur-sm rounded-full shadow-sm"
                  >
                    <X size={18} className="text-[var(--text)]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdateUserDetails;
