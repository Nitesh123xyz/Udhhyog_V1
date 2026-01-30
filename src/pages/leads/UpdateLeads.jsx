import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import {
  useViewLeadsAdditionalInfoQuery,
  useUpdateLeadsMutation,
} from "../../features/leads/leadsSlice";
import LeadsAdditionalDetailsHeader from "../../components/leads/LeadsAdditionalDetailsHeader";

/* ================== INPUT CLASS ================== */

const inputClass =
  "w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none";

/* ================== ZOD SCHEMA ================== */

const schema = z.object({
  companyname: z.string().min(1, "Company name is required"),
  number: z.string().min(10, "Phone number is required"),
  emailid: z.string().email("Invalid email"),
  source: z.string().min(1, "Source is required"),
  requirement: z.string().min(1, "Requirement is required"),
  file: z.string().min(1, "File is required"),
  status: z.string().min(1, "Status is required"),
  date: z.string().min(1, "Status is required"),
});

/* ================== MAPPER ================== */

const mapServerToForm = (body) => ({
  companyname: body?.companyname ?? "",
  number: body?.number ?? "",
  emailid: body?.emailid ?? "",
  source: body?.source ?? "",
  requirement: body?.requirement ?? "",
  file: body?.file ?? "",
  date: body?.date ?? "",
  status: body?.status ?? "",
});

/* ================== COMPONENT ================== */

const UpdateLeads = ({ step, setStep, leadsId }) => {
  const { token } = useAuth();
  console.log(leadsId);
  const viewPayload = {
    token,
    lead_id: leadsId,
    action: "viewone",
  };

  const { data, isLoading } = useViewLeadsAdditionalInfoQuery(viewPayload);

  const defaultValues = useMemo(
    () =>
      data?.body?.lead[0]
        ? mapServerToForm(data.body.lead[0])
        : {
            companyname: "",
            number: "",
            emailid: "",
            source: "",
            requirement: "",
            file: "",
            date: "",
            status: "",
          },
    [data],
  );

  const { register, reset, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.body) reset(mapServerToForm(data.body.lead[0]));
  }, [data, reset]);

  const [updateLead] = useUpdateLeadsMutation();

  /* ================== SAVE ================== */

  const saveLead = async () => {
    await updateLead({
      token,
      lead_id: leadsId,
      action: "edit",
      ...getValues(),
    }).unwrap();
    setStep(2);
    toast.success("Lead updated successfully");
  };

  if (isLoading) return <Loader />;

  return (
    <section className="bg-[var(--background)] h-screen rounded-lg border border-[var(--border)] p-4">
      <LeadsAdditionalDetailsHeader step={step} setStep={setStep} />
      <h4 className="text-xl font-semibold text-[var(--text)] mb-4">
        Update Lead
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          {...register("companyname")}
          placeholder="Company Name"
          className={inputClass}
        />

        <input
          {...register("number")}
          placeholder="Phone Number"
          className={inputClass}
        />

        <input
          {...register("emailid")}
          placeholder="Email ID"
          className={inputClass}
        />

        <input
          {...register("source")}
          placeholder="Source"
          className={inputClass}
        />

        <input type="date" {...register("date")} className={inputClass} />

        <input
          {...register("status")}
          placeholder="Status"
          className={inputClass}
        />

        <input
          {...register("file")}
          placeholder="File"
          className={inputClass}
        />

        <textarea
          {...register("requirement")}
          placeholder="Requirement"
          className={`${inputClass} md:col-span-3`}
          rows={3}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={saveLead}
          className="cursor-pointer p-2 lg:p-3 flex items-center justify-center bg-blue-400 backdrop-blur-sm rounded-full shadow-sm"
        >
          <Save size={18} className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default UpdateLeads;
