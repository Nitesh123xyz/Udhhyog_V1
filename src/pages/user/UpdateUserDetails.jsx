import React, { useEffect, useState } from "react";
import { employees } from "../../utils/DummyData";

const emptyContact = {
  email: "",
  phone: "",
  dob: "",
  panCard: "",
  maritalStatus: "",
  bloodGroup: "",
  address: "",
};

const UpdateUserDetails = ({ setStep, employeesId }) => {
  const [employeeIndex, setEmployeeIndex] = useState(-1);
  const [form, setForm] = useState({
    // core profile
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
    // nested / lists
    contact: { ...emptyContact },
    emergencyContacts: [],
    education: [],
    family: [],
    documents: [],
  });

  // Find employee and set form
  useEffect(() => {
    const idx = employees.findIndex((e) => e.id === employeesId);
    setEmployeeIndex(idx);
    if (idx !== -1) {
      const emp = employees[idx];
      setForm({
        id: emp.id,
        name: emp.name || "",
        jobTitle: emp.jobTitle || "",
        department: emp.department || "",
        site: emp.site || "",
        salary: emp.salary || "",
        startDate: emp.startDate || "",
        lifecycle: emp.lifecycle || "",
        status: emp.status || "",
        avatar: emp.avatar || "",
        contact: { ...emptyContact, ...(emp.contact || {}) },
        emergencyContacts: Array.isArray(emp.emergencyContacts)
          ? emp.emergencyContacts.map((c) => ({ ...c }))
          : [],
        education: Array.isArray(emp.education)
          ? emp.education.map((e) => ({ ...e }))
          : [],
        family: Array.isArray(emp.family)
          ? emp.family.map((f) => ({ ...f }))
          : [],
        documents: Array.isArray(emp.documents)
          ? emp.documents.map((d) => ({ ...d }))
          : [],
      });
    }
  }, [employeesId]);

  // Generic change handler for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Contact change
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, contact: { ...p.contact, [name]: value } }));
  };

  // Helpers for list fields
  const handleListChange = (listName, index, field, value) => {
    setForm((p) => {
      const list = [...(p[listName] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...p, [listName]: list };
    });
  };

  const addListItem = (listName, template = {}) => {
    setForm((p) => ({ ...p, [listName]: [...(p[listName] || []), template] }));
  };

  const removeListItem = (listName, index) => {
    setForm((p) => {
      const list = [...(p[listName] || [])];
      list.splice(index, 1);
      return { ...p, [listName]: list };
    });
  };

  const handleSave = () => {
    if (employeeIndex === -1) {
      alert("Employee not found.");
      return;
    }
    // Mock update in the imported array
    employees[employeeIndex] = {
      ...employees[employeeIndex],
      id: form.id,
      name: form.name,
      jobTitle: form.jobTitle,
      department: form.department,
      site: form.site,
      salary: form.salary,
      startDate: form.startDate,
      lifecycle: form.lifecycle,
      status: form.status,
      avatar: form.avatar,
      contact: { ...form.contact },
      emergencyContacts: form.emergencyContacts.map((c) => ({ ...c })),
      education: form.education.map((e) => ({ ...e })),
      family: form.family.map((f) => ({ ...f })),
      documents: form.documents.map((d) => ({ ...d })),
    };

    alert("Employee updated (mock).");
    setStep(1); // return to listing / details screen
  };

  // Minor validation example
  const isValid = () => {
    if (!form.name) return false;
    if (!form.contact.email && !form.contact.phone) return false;
    return true;
  };

  return (
    <section className="bg-[var(--background)] p-6 rounded-lg border border-[var(--border)] max-w-5xl mx-auto">
      <h3 className="font-semibold text-lg mb-4 text-[var(--text)]">
        Update Employee
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Core profile */}
        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Job Title
          </label>
          <input
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Department
          </label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Site
          </label>
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Salary
          </label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Start Date
          </label>
          <input
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            placeholder="e.g. Jan 01, 2020"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Lifecycle
          </label>
          <input
            name="lifecycle"
            value={form.lifecycle}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)]">
            Status
          </label>
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-[var(--text)]">
            Avatar URL
          </label>
          <input
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="mt-6 p-4 rounded-lg border border-[var(--border)]">
        <h4 className="font-semibold mb-3 text-[var(--text)]">Contact</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Email</label>
            <input
              name="email"
              value={form.contact.email}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input
              name="phone"
              value={form.contact.phone}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block text-sm">DOB</label>
            <input
              name="dob"
              value={form.contact.dob}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              placeholder="YYYY-MM-DD or MMM DD, YYYY"
            />
          </div>
          <div>
            <label className="block text-sm">PAN Card</label>
            <input
              name="panCard"
              value={form.contact.panCard}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>

          <div>
            <label className="block text-sm">Marital Status</label>
            <input
              name="maritalStatus"
              value={form.contact.maritalStatus}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>
          <div>
            <label className="block text-sm">Blood Group</label>
            <input
              name="bloodGroup"
              value={form.contact.bloodGroup}
              onChange={handleContactChange}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm">Address</label>
            <textarea
              name="address"
              value={form.contact.address}
              onChange={handleContactChange}
              rows={2}
              className="w-full px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 p-4 rounded-lg border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[var(--text)]">
            Emergency Contacts
          </h4>
          <button
            type="button"
            onClick={() =>
              addListItem("emergencyContacts", {
                name: "",
                relation: "",
                phone: "",
              })
            }
            className="text-sm px-2 py-1 rounded border border-[var(--border)]"
          >
            Add
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {(form.emergencyContacts || []).map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
            >
              <input
                placeholder="Name"
                value={c.name}
                onChange={(e) =>
                  handleListChange(
                    "emergencyContacts",
                    i,
                    "name",
                    e.target.value
                  )
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Relation"
                value={c.relation}
                onChange={(e) =>
                  handleListChange(
                    "emergencyContacts",
                    i,
                    "relation",
                    e.target.value
                  )
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Phone"
                value={c.phone}
                onChange={(e) =>
                  handleListChange(
                    "emergencyContacts",
                    i,
                    "phone",
                    e.target.value
                  )
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => removeListItem("emergencyContacts", i)}
                  className="px-2 py-1 rounded border border-red-500 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-6 p-4 rounded-lg border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[var(--text)]">Education</h4>
          <button
            type="button"
            onClick={() =>
              addListItem("education", {
                degree: "",
                institute: "",
                result: "",
                year: "",
              })
            }
            className="text-sm px-2 py-1 rounded border border-[var(--border)]"
          >
            Add
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {(form.education || []).map((ed, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
            >
              <input
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) =>
                  handleListChange("education", i, "degree", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Institute"
                value={ed.institute}
                onChange={(e) =>
                  handleListChange("education", i, "institute", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Result"
                value={ed.result}
                onChange={(e) =>
                  handleListChange("education", i, "result", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <div className="flex gap-2 items-center">
                <input
                  placeholder="Year"
                  value={ed.year}
                  onChange={(e) =>
                    handleListChange("education", i, "year", e.target.value)
                  }
                  className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)] w-24"
                />
                <button
                  onClick={() => removeListItem("education", i)}
                  className="px-2 py-1 rounded border border-red-500 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family */}
      <div className="mt-6 p-4 rounded-lg border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[var(--text)]">Family</h4>
          <button
            type="button"
            onClick={() =>
              addListItem("family", {
                name: "",
                relation: "",
                dob: "",
                occupation: "",
              })
            }
            className="text-sm px-2 py-1 rounded border border-[var(--border)]"
          >
            Add
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {(form.family || []).map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
            >
              <input
                placeholder="Name"
                value={f.name}
                onChange={(e) =>
                  handleListChange("family", i, "name", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Relation"
                value={f.relation}
                onChange={(e) =>
                  handleListChange("family", i, "relation", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="DOB"
                value={f.dob}
                onChange={(e) =>
                  handleListChange("family", i, "dob", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <div className="flex gap-2 items-center">
                <input
                  placeholder="Occupation"
                  value={f.occupation}
                  onChange={(e) =>
                    handleListChange("family", i, "occupation", e.target.value)
                  }
                  className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
                />
                <button
                  onClick={() => removeListItem("family", i)}
                  className="px-2 py-1 rounded border border-red-500 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mt-6 p-4 rounded-lg border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[var(--text)]">Documents</h4>
          <button
            type="button"
            onClick={() =>
              addListItem("documents", { type: "", label: "View", url: "" })
            }
            className="text-sm px-2 py-1 rounded border border-[var(--border)]"
          >
            Add
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {(form.documents || []).map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end"
            >
              <input
                placeholder="Type (e.g. PAN)"
                value={d.type}
                onChange={(e) =>
                  handleListChange("documents", i, "type", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="Label"
                value={d.label}
                onChange={(e) =>
                  handleListChange("documents", i, "label", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <input
                placeholder="URL"
                value={d.url}
                onChange={(e) =>
                  handleListChange("documents", i, "url", e.target.value)
                }
                className="px-2 py-1 rounded border border-[var(--border)] bg-transparent text-[var(--text)]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => removeListItem("documents", i)}
                  className="px-2 py-1 rounded border border-red-500 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setStep(1)}
          className="px-4 py-2 rounded-md bg-gray-300 text-black border border-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!isValid()) {
              alert(
                "Please fill name and at least one contact (email or phone)."
              );
              return;
            }
            handleSave();
          }}
          className="px-4 py-2 rounded-md bg-yellow-400 text-black border border-yellow-500"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default UpdateUserDetails;
