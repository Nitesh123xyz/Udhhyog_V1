import React, { useState } from "react";
import { User, Phone, Mail, Home, Landmark, FileText, X } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAddVendorAdditionalDetailsMutation } from "../../features/vendor/vendorSlice";

/* -------------------------------------------------------------------------- */
/*                                   Schemas                                  */
/* -------------------------------------------------------------------------- */

const contactSchema = z.object({
  person_name: z.string().min(1, "Required"),
  designation: z.string().min(1, "Required"),
  phoneno1: z.string().length(10, "10 digits required"),
  phoneno2: z.string().optional(),
  contact_emailid: z.string().email("Invalid email"),
});

const addressSchema = z.object({
  vendor_address: z.string().min(1),
  pincode: z.string().length(6),
  add_type: z.string().min(1),
  short_name: z.string().min(1),
  gst: z.string().optional(),
});

const bankSchema = z.object({
  bank_name: z.string().min(1),
  acc_no: z.string().min(5),
  ifsc_code: z.string().min(5),
  branch_name: z.string().min(1),
});

const documentSchema = z.object({
  doc_type: z.string().min(1),
  number: z.string().min(1),
  url: z.string().min(1),
});

/* -------------------------------------------------------------------------- */
/*                              UI Components                                  */
/* -------------------------------------------------------------------------- */

const InputField = ({ label, value, onChange, error, type = "text", Icon }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]">
      {Icon && <Icon size={16} />}
      {label}
    </label>

    {type === "textarea" ? (
      <textarea
        rows={1}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 border rounded-lg outline-none border-[var(--border)] text-[var(--text)]"
      />
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 border rounded-lg outline-none border-[var(--border)] text-[var(--text)]"
      />
    )}

    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const Field = ({ control, name, label, type, Icon }) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <InputField
        label={label}
        type={type}
        Icon={Icon}
        value={field.value}
        onChange={field.onChange}
        error={fieldState.error?.message}
      />
    )}
  />
);

/* -------------------------------------------------------------------------- */
/*                                Main Component                               */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { key: "contact", label: "Contact", subaction: "vendor_contact" },
  { key: "address", label: "Address", subaction: "vendor_address" },
  { key: "bank", label: "Bank", subaction: "vendor_bankdetail" },
  { key: "document", label: "Document", subaction: "vendor_document" },
];

const AddVendorAdditionalDetails = ({ vendor_id, open, onClose }) => {
  const { token } = useAuth();
  const [addVendor] = useAddVendorAdditionalDetailsMutation();

  const [step, setStep] = useState(0);

  const contactForm = useForm({ resolver: zodResolver(contactSchema) });
  const addressForm = useForm({ resolver: zodResolver(addressSchema) });
  const bankForm = useForm({ resolver: zodResolver(bankSchema) });

  const documentForm = useForm({
    resolver: zodResolver(
      z.object({ documents: z.array(documentSchema).min(1) })
    ),
    defaultValues: { documents: [{ doc_type: "", number: "", url: "" }] },
  });

  const docFA = useFieldArray({
    control: documentForm.control,
    name: "documents",
  });

  if (!open) return null;

  /* ----------------------------- Submit Handler ----------------------------- */

  const submitStep = async (data, subaction, reset, isLast = false) => {
    try {
      const res = await addVendor({
        token,
        vendor_id,
        action: "add",
        subaction,
        ...data,
      }).unwrap();

      if (res?.status === 200) {
        toast.success("Added successfully");
        reset();

        if (isLast) {
          onClose?.();
        } else {
          setStep((s) => s + 1);
        }
      }
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/20 flex items-center rounded-lg justify-center">
      <div className="relative w-full max-w-6xl bg-[var(--background)] rounded-lg p-6 h-[30rem]">
        {/* Close */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 p-2.5 rounded-full bg-[var(--border)] text-[var(--text)] hover:opacity-80 transition-opacity"
        >
          <X size={15} />
        </button>

        {/* Tabs*/}
        <div className="flex gap-3 border-b border-[var(--border)] mb-6 pb-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStep(i)}
              className={`p-3 rounded-lg transition ${
                i === step
                  ? "bg-[var(--border)] text-white"
                  : "text-[var(--text)] hover:bg-[var(--permissionTable)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* CONTACT */}
        {step === 0 && (
          <Section
            title="Contact Details"
            onAdd={contactForm.handleSubmit((d) =>
              submitStep(d, "vendor_contact", contactForm.reset)
            )}
          >
            <Field
              control={contactForm.control}
              name="person_name"
              label="Person Name"
              Icon={User}
            />
            <Field
              control={contactForm.control}
              name="designation"
              label="Designation"
            />
            <Field
              control={contactForm.control}
              name="contact_emailid"
              label="Email"
              Icon={Mail}
            />
            <Field
              control={contactForm.control}
              name="phoneno1"
              label="Phone No 1"
              Icon={Phone}
            />
            <Field
              control={contactForm.control}
              name="phoneno2"
              label="Phone No 2"
              Icon={Phone}
            />
          </Section>
        )}

        {/* ADDRESS */}
        {step === 1 && (
          <Section
            title="Address Details"
            onAdd={addressForm.handleSubmit((d) =>
              submitStep(d, "vendor_address", addressForm.reset)
            )}
          >
            <Field
              control={addressForm.control}
              name="add_type"
              label="Address Type"
            />

            <Field
              control={addressForm.control}
              name="pincode"
              label="Pincode"
            />
            <Field
              control={addressForm.control}
              name="short_name"
              label="Short Name"
            />
            <Field control={addressForm.control} name="gst" label="GST" />
            <Field
              control={addressForm.control}
              name="vendor_address"
              label="Address"
              type="textarea"
              Icon={Home}
            />
          </Section>
        )}

        {/* BANK */}
        {step === 2 && (
          <Section
            title="Bank Details"
            onAdd={bankForm.handleSubmit((d) =>
              submitStep(d, "vendor_bankdetail", bankForm.reset)
            )}
          >
            <Field
              control={bankForm.control}
              name="bank_name"
              label="Bank Name"
              Icon={Landmark}
            />
            <Field
              control={bankForm.control}
              name="acc_no"
              label="Account Number"
            />
            <Field
              control={bankForm.control}
              name="ifsc_code"
              label="IFSC Code"
            />
            <Field
              control={bankForm.control}
              name="branch_name"
              label="Branch Name"
            />
          </Section>
        )}

        {/* DOCUMENT – LAST */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">
              Documents
            </h2>

            {docFA.fields.map((_, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <Controller
                  control={documentForm.control}
                  name={`documents.${index}.doc_type`}
                  render={({ field }) => (
                    <InputField
                      label="Type"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={documentForm.control}
                  name={`documents.${index}.number`}
                  render={({ field }) => (
                    <InputField
                      label="Number"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={documentForm.control}
                  name={`documents.${index}.url`}
                  render={({ field }) => (
                    <InputField
                      label="URL"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            ))}

            <button
              onClick={() =>
                docFA.append({ doc_type: "", number: "", url: "" })
              }
              className="underline text-sm"
            >
              + Add another document
            </button>

            <div className="flex justify-end mt-6">
              <button
                onClick={documentForm.handleSubmit(({ documents }) =>
                  documents.forEach((doc) =>
                    submitStep(doc, "vendor_document", documentForm.reset, true)
                  )
                )}
                className="px-6 py-2 border rounded-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Section Wrapper                               */
/* -------------------------------------------------------------------------- */

const Section = ({ title, children, onAdd }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>

    <div className="flex justify-end mt-6">
      <button
        onClick={onAdd}
        className="cursor-pointer px-6 py-2 font-semibold text-[var(--text)] bg-blue-500 rounded-md hover:bg-blue-400 transition-colors "
      >
        Add
      </button>
    </div>
  </div>
);

export default AddVendorAdditionalDetails;
