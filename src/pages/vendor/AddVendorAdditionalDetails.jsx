import React, { useState } from "react";
import { User, Phone, Mail, Home, Landmark, FileText } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAddVendorAdditionalDetailsMutation } from "../../features/vendor/vendorSlice";

/* -------------------------------------------------------------------------- */
/*                               InputField                                   */
/* -------------------------------------------------------------------------- */

const InputField = ({ label, value, onChange, type = "text", Icon, error }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]">
      {Icon && <Icon size={16} />}
      {label}
    </label>

    {type === "textarea" ? (
      <textarea
        rows={3}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] outline-none"
      />
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--text)] outline-none"
      />
    )}

    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */

const contactSchema = z.object({
  person_name: z.string().min(1),
  designation: z.string().min(1),
  phoneno1: z.string().min(10).max(10),
  phoneno2: z.string().optional(),
  contact_emailid: z.string().email(),
});

const addressSchema = z.object({
  vendor_address: z.string().min(1),
  pincode: z.string().min(6).max(6),
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
/*                             Main Component                                  */
/* -------------------------------------------------------------------------- */

const AddVendorAdditionalDetails = ({ vendor_id }) => {
  const { token } = useAuth();
  const [addVendor] = useAddVendorAdditionalDetailsMutation();
  const [activeForm, setActiveForm] = useState("contact");

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

  const submitSection = async (data, subaction, reset) => {
    try {
      const res = await addVendor({
        token,
        vendor_id,
        action: "ADD",
        subaction,
        ...data,
      }).unwrap();

      if (res?.status === 200) {
        toast.success("Added successfully");
        reset && reset();
      }
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="h-screen bg-[var(--background)] p-6 text-[var(--text)]">
      <div className="rounded-xl shadow-lg p-6 border border-[var(--border)]">
        {/* ===================== TOP BUTTONS ===================== */}
        <div className="flex gap-3 border-b border-[var(--border)] pb-4 mb-6">
          <TopButton
            icon={User}
            label="Contact"
            active={activeForm === "contact"}
            onClick={() => setActiveForm("contact")}
          />
          <TopButton
            icon={Home}
            label="Address"
            active={activeForm === "address"}
            onClick={() => setActiveForm("address")}
          />
          <TopButton
            icon={FileText}
            label="Document"
            active={activeForm === "document"}
            onClick={() => setActiveForm("document")}
          />
          <TopButton
            icon={Landmark}
            label="Bank"
            active={activeForm === "bank"}
            onClick={() => setActiveForm("bank")}
          />
        </div>

        {activeForm === "contact" && (
          <FormSection
            title="Vendor Contact Details"
            form={contactForm}
            onSubmit={(d) =>
              submitSection(d, "VENDOR_CONTACT", contactForm.reset)
            }
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
          </FormSection>
        )}

        {activeForm === "address" && (
          <FormSection
            title="Vendor Address Details"
            form={addressForm}
            onSubmit={(d) =>
              submitSection(d, "VENDOR_ADDRESS", addressForm.reset)
            }
          >
            <Field
              control={addressForm.control}
              name="vendor_address"
              label="Address"
              type="textarea"
              Icon={Home}
            />
            <Field
              control={addressForm.control}
              name="pincode"
              label="Pincode"
            />
            <Field
              control={addressForm.control}
              name="add_type"
              label="Address Type"
            />
            <Field
              control={addressForm.control}
              name="short_name"
              label="Short Name"
            />
            <Field control={addressForm.control} name="gst" label="GST" />
          </FormSection>
        )}

        {activeForm === "document" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">
              Vendor Documents
            </h2>
            {docFA.fields.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <DocField
                  form={documentForm}
                  index={index}
                  name="doc_type"
                  label="Type"
                />
                <DocField
                  form={documentForm}
                  index={index}
                  name="number"
                  label="Number"
                />
                <DocField
                  form={documentForm}
                  index={index}
                  name="url"
                  label="URL"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                docFA.append({ doc_type: "", number: "", url: "" })
              }
              className="text-sm underline text-[var(--text)]"
            >
              + Add another document
            </button>
            <SubmitButton
              onClick={documentForm.handleSubmit(({ documents }) =>
                documents.forEach((doc) =>
                  submitSection(doc, "VENDOR_DOCUMENT")
                )
              )}
            />
          </div>
        )}

        {activeForm === "bank" && (
          <FormSection
            title="Vendor Bank Details"
            form={bankForm}
            onSubmit={(d) =>
              submitSection(d, "VENDOR_BANKDETAIL", bankForm.reset)
            }
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
          </FormSection>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               UI Helpers                                   */
/* -------------------------------------------------------------------------- */

const TopButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer flex items-center gap-2 px-5 py-3 rounded-lg transition ${
      active ? "text-[var(--text)] bg-[var(--permissionTable)]" : "bg-transparent text-[var(--text)] hover:bg-[var(--permissionTable)]"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const FormSection = ({ title, form, onSubmit, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[var(--text)]">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
    <SubmitButton onClick={form.handleSubmit(onSubmit)} />
  </div>
);

const SubmitButton = ({ onClick }) => (
  <div className="flex justify-end mt-6">
    <button
      onClick={onClick}
      className="px-6 py-3 border border-[var(--border)] rounded-lg font-semibold text-[var(--text)]"
    >
      Add
    </button>
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

const DocField = ({ form, index, name, label }) => (
  <Controller
    control={form.control}
    name={`documents.${index}.${name}`}
    render={({ field }) => (
      <InputField label={label} value={field.value} onChange={field.onChange} />
    )}
  />
);

export default AddVendorAdditionalDetails;
