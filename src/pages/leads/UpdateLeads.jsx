import React, { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  X,
  Save,
  CreditCard,
  MapPin,
  Users,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import VendorAdditionalDetailsHeader from "../../components/VendorAdditionalDetailsHeader";
import {
  useViewVendorAdditionalInfoQuery,
  useUpdateVendorBasicMutation,
  useUpdateVendorContactMutation,
  useUpdateVendorAddressMutation,
  useUpdateVendorBankMutation,
} from "../../features/vendor/vendorSlice";

/* ================== CONSTANTS ================== */

const companyTypes = [
  "retailer",
  "manufacture",
  "distributer",
  "trader",
  "transpoter",
];

const inputClass =
  "w-full mt-1 px-3 py-2 rounded-md border border-[var(--border)] bg-transparent text-[var(--text)] outline-none";

/* ================== ZOD SCHEMA ================== */

const schema = z.object({
  companyname: z.string().min(1),
  com_emailid: z.string().email(),
  com_gst: z.string().optional(),
  com_type: z.string().optional(),
  credittime: z.string().optional(),

  contacts: z.array(
    z.object({
      id: z.number().optional(),
      person_name: z.string(),
      designation: z.string(),
      phoneno1: z.string().length(10),
      phoneno2: z.string().optional(),
      contact_emailid: z.string().email(),
    })
  ),

  address: z.array(
    z.object({
      id: z.number().optional(),
      short_name: z.string(),
      vendor_address: z.string(),
      gst: z.string().optional(),
      pincode: z.string().length(6),
      add_type: z.string(),
    })
  ),

  bankdetail: z.array(
    z.object({
      id: z.number().optional(),
      acc_no: z.string(),
      bank_name: z.string(),
      branch_name: z.string(),
      ifsc_code: z.string(),
    })
  ),
});

/* ================== MAPPER ================== */

const mapServerToForm = (body) => ({
  companyname: body?.basic?.[0]?.companyname ?? "",
  com_emailid: body?.basic?.[0]?.com_emailid ?? "",
  com_gst: body?.basic?.[0]?.com_gst ?? "",
  com_type: body?.basic?.[0]?.com_type ?? "",
  credittime: body?.basic?.[0]?.credittime ?? "",

  contacts: body?.contact ?? [],
  address: body?.address ?? [],
  bankdetail: body?.bankdetail ?? [],
});

/* ================== COMPONENT ================== */

const UpdateVendor = ({ step, setStep, vendorId }) => {
  const { token } = useAuth();

  const payload = {
    token,
    vendor_id: vendorId,
    action: "view",
    subaction: "one",
  };

  const { data, isLoading } = useViewVendorAdditionalInfoQuery(payload);

  const defaultValues = useMemo(
    () =>
      data?.body
        ? mapServerToForm(data.body)
        : {
            companyname: "",
            com_emailid: "",
            com_gst: "",
            com_type: "",
            credittime: "",
            contacts: [],
            address: [],
            bankdetail: [],
          },
    [data]
  );

  const { register, control, reset, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.body) reset(mapServerToForm(data.body));
  }, [data, reset]);

  const contactsField = useFieldArray({ control, name: "contacts" });
  const addressField = useFieldArray({ control, name: "address" });
  const bankField = useFieldArray({ control, name: "bankdetail" });

  const [updateBasic] = useUpdateVendorBasicMutation();
  const [updateContact] = useUpdateVendorContactMutation();
  const [updateAddress] = useUpdateVendorAddressMutation();
  const [updateBank] = useUpdateVendorBankMutation();

  /* ================== SAVE HANDLERS ================== */

  const saveBasic = async () => {
    await updateBasic({
      token,
      vendor_id: vendorId,
      action: "edit",
      subaction: "basic_vendor",
      ...getValues(),
    });
    setStep(2);
    toast.success("Basic Information Updated");
  };

  const saveContact = async (i) => {
    const row = getValues(`contacts.${i}`);
    await updateContact({
      token,
      vendor_id: vendorId,
      action: "edit",
      subaction: "vendor_contact",
      id: row.id,
      ...row,
    });
    setStep(2);
    toast.success("Contact Updated");
  };

  const saveAddress = async (i) => {
    const row = getValues(`address.${i}`);
    await updateAddress({
      token,
      vendor_id: vendorId,
      action: "edit",
      subaction: "vendor_address",
      id: row.id,
      ...row,
    });
    setStep(2);
    toast.success("Address Updated");
  };

  const saveBank = async (i) => {
    const row = getValues(`bankdetail.${i}`);
    await updateBank({
      token,
      vendor_id: vendorId,
      action: "edit",
      subaction: "vendor_bankdetail",
      id: row.id,
      ...row,
    });
    setStep(2);
    toast.success("Bank Details Updated");
  };

  if (isLoading) return <Loader />;

  return (
    <section className="bg-[var(--background)] rounded-t-lg border border-[var(--border)] p-2">
      <VendorAdditionalDetailsHeader step={step} setStep={setStep} />

      {/* ================== BASIC ================== */}
      <div className="p-2 rounded-lg border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-2">
          <Building className="text-[var(--text)]" />
          <h4 className="text-xl font-semibold text-[var(--text)]">
            Basic Information
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register("companyname")} className={inputClass} />
          <input {...register("com_emailid")} className={inputClass} />
          <input {...register("com_gst")} className={inputClass} />

          <select
            {...register("com_type")}
            className={`${inputClass} bg-[var(--background)]`}
          >
            <option value="">Select Company Type</option>
            {companyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input {...register("credittime")} className={inputClass} />
        </div>

        <div className="flex justify-end mt-2">
          <button
            onClick={saveBasic}
            className="cursor-pointer p-2 bg-blue-400 rounded-full shadow-sm"
          >
            <Save size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* ================== CONTACT ================== */}
      <div className="p-2 rounded-lg border border-[var(--border)] mt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="text-[var(--text)]" />
            <h4 className="font-semibold text-[var(--text)]">Contacts</h4>
          </div>
          <button
            onClick={() =>
              contactsField.append({
                person_name: "",
                designation: "",
                phoneno1: "",
                phoneno2: "",
                contact_emailid: "",
              })
            }
            className="p-2.5 rounded-full bg-green-500 text-white"
          >
            <Plus size={18} />
          </button>
        </div>

        {contactsField.fields.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end mb-2"
          >
            <input
              {...register(`contacts.${i}.person_name`)}
              className={inputClass}
            />
            <input
              {...register(`contacts.${i}.designation`)}
              className={inputClass}
            />
            <input
              {...register(`contacts.${i}.phoneno1`)}
              className={inputClass}
            />
            <input
              {...register(`contacts.${i}.phoneno2`)}
              className={inputClass}
            />
            <input
              {...register(`contacts.${i}.contact_emailid`)}
              className={inputClass}
            />

            <div className="flex gap-2">
              <button
                onClick={() => saveContact(i)}
                className="p-2 bg-blue-400 rounded-full"
              >
                <Save size={16} className="text-white" />
              </button>
              <button
                onClick={() => contactsField.remove(i)}
                className="p-2 bg-red-400 rounded-full"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================== ADDRESS ================== */}
      <div className="p-2 rounded-lg border border-[var(--border)] mt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="text-[var(--text)]" />
            <h4 className="font-semibold text-[var(--text)]">Address</h4>
          </div>
          <button
            onClick={() =>
              addressField.append({
                short_name: "",
                vendor_address: "",
                gst: "",
                pincode: "",
                add_type: "",
              })
            }
            className="p-2.5 rounded-full bg-green-500 text-white"
          >
            <Plus size={18} />
          </button>
        </div>

        {addressField.fields.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end mb-2"
          >
            <input
              {...register(`address.${i}.short_name`)}
              className={inputClass}
            />
            <input
              {...register(`address.${i}.vendor_address`)}
              className={inputClass}
            />
            <input {...register(`address.${i}.gst`)} className={inputClass} />
            <input
              {...register(`address.${i}.pincode`)}
              className={inputClass}
            />
            <input
              {...register(`address.${i}.add_type`)}
              className={inputClass}
            />

            <div className="flex gap-2">
              <button
                onClick={() => saveAddress(i)}
                className="p-2 bg-blue-400 rounded-full"
              >
                <Save size={16} className="text-white" />
              </button>
              <button
                onClick={() => addressField.remove(i)}
                className="p-2 bg-red-400 rounded-full"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================== BANK DETAILS (ARRAY) ================== */}
      <div className="p-2 rounded-lg border border-[var(--border)] mt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CreditCard className="text-[var(--text)]" />
            <h4 className="font-semibold text-[var(--text)]">Bank Details</h4>
          </div>
          <button
            onClick={() =>
              bankField.append({
                bank_name: "",
                acc_no: "",
                ifsc_code: "",
                branch_name: "",
              })
            }
            className="p-2.5 rounded-full bg-green-500 text-white"
          >
            <Plus size={18} />
          </button>
        </div>

        {bankField.fields.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end mb-2"
          >
            <input
              {...register(`bankdetail.${i}.bank_name`)}
              className={inputClass}
            />
            <input
              {...register(`bankdetail.${i}.acc_no`)}
              className={inputClass}
            />
            <input
              {...register(`bankdetail.${i}.ifsc_code`)}
              className={inputClass}
            />
            <input
              {...register(`bankdetail.${i}.branch_name`)}
              className={inputClass}
            />

            <div className="flex gap-2">
              <button
                onClick={() => saveBank(i)}
                className="p-2 bg-blue-400 rounded-full"
              >
                <Save size={16} className="text-white" />
              </button>
              <button
                onClick={() => bankField.remove(i)}
                className="p-2 bg-red-400 rounded-full"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpdateVendor;
