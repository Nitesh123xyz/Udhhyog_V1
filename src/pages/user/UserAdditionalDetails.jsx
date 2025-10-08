import { useState } from "react";
import { employees } from "../../utils/DummyData";
import ImageSlider from "../../components/ImageSlider";
import { Trash, Undo2, UserPen } from "lucide-react";
import DialogBox from "../../components/DialogBox";
import ScrollTop from "../../utils/ScrollTop";
import Header from "../../components/Header";
import UserAdditionalDetailsHeader from "../../components/UserAdditionalDetailsHeader";
const UserAdditionalDetails = ({ step, setStep, employeesId }) => {
  const [preview, setPreview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const rows = [...employees.filter((e) => e.id === employeesId)];
  const {
    name,
    jobTitle,
    contact,
    department,
    salary,
    startDate,
    status,
    emergencyContacts,
    education,
    family,
    documents,
    bank,
    experience,
  } = rows[0] || [];

  const imagesFromDocs = (documents || []).map((d) => ({
    src: d.url,
    alt: d.type,
  }));

  const handleDeleteUser = () => {
    setOpenDialog(true);
    if (confirmation) {
      console.log("user Deleted");
    }
    // setStep(1);
  };

  return (
    <>
      <section className="bg-[var(--background)] backdrop-blur-md rounded-t-lg  lg:rounded-lg px-2 py-1">
        <div className="flex justify-end gap-3 mb-2">
          <UserAdditionalDetailsHeader
            step={step}
            setStep={setStep}
            setOpenDialog={setOpenDialog}
          />
        </div>
        <div className="mx-auto space-y-2 min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-2 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-2 text-[var(--text)] relative">
                Contact & Identity
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>
              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2  2xl:grid-cols-3 space-y-2">
                <div>
                  <span className="font-bold text-[var(--text)]">Name :</span>{" "}
                  <span className="text-gray-400">{name}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Job :</span>{" "}
                  <span className="text-gray-400">{jobTitle}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Department :
                  </span>{" "}
                  <span className="text-gray-400">{department}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Status :</span>{" "}
                  <span className="text-gray-400">{status}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Start Date :
                  </span>{" "}
                  <span className="text-gray-400">{startDate}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Salary :</span>{" "}
                  <span className="text-gray-400">{salary}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Email :</span>{" "}
                  {contact?.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {contact.email}
                    </a>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Phone :</span>{" "}
                  {contact?.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {contact?.phone}
                    </a>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Whatsapp :
                  </span>{" "}
                  {contact?.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {contact?.whatsapp}
                    </a>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">DOB :</span>{" "}
                  <span className="text-gray-400">{contact?.dob}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Marital Status :
                  </span>{" "}
                  <span className="text-gray-400">
                    {contact?.maritalStatus}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Blood Group :
                  </span>{" "}
                  <span className="text-gray-400">{contact?.bloodGroup}</span>
                </div>
                <div>
                  <span className="font-bold  text-[var(--text)]">
                    Address :
                  </span>{" "}
                  <span className="text-gray-400">{contact?.address}</span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Emergency Contacts
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="rounded-lg">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Name
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Relation
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Contact Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emergencyContacts?.map((ec, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {ec?.name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {ec?.relation}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {ec?.phone && (
                            <a
                              href={`tel:${ec?.phone}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400"
                            >
                              {ec?.phone}
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Family Details
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-x-auto rounded-sm">
                <table className="w-full min-w-[32rem] text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Name
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Relation
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Phone
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        DOB
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Occupation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {family?.map((f, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.relation}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.phone && (
                            <a
                              href={`tel:${f?.phone}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400"
                            >
                              {f?.phone}
                            </a>
                          )}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.dob}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.occupation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--border)]">
              <h3 className=" inline-block font-semibold mb-1 relative text-[var(--text)]">
                Documents Preview
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>

              <div>
                {documents?.map((doc, i) => (
                  <div
                    key={i}
                    className="p-1 rounded-sm flex items-center justify-between border-b border-b-[var(--border)] hover:bg-[var(--permissionTable)]"
                  >
                    <div className="text-sm font-bold text-[var(--text)] flex-1/3 sm:flex-1">
                      {doc?.type}
                    </div>

                    <div className="text-sm  text-gray-400 flex-1/2 sm:flex-1 tracking-wider">
                      {doc?.doc?.replace(/.(?=.{4})/g, "X")}
                    </div>

                    {imagesFromDocs.length > 0 && (
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => {
                            setSelectedIndex(i);
                            setPreview(true);
                            ScrollTop();
                          }}
                          className="px-3 py-1 rounded border border-[var(--border)] text-[var(--text)] text-sm cursor-pointer"
                        >
                          Preview
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-2 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Experience
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-x-auto rounded-lg">
                <table className="w-full min-w-[32rem]  text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Company
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Role
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Years
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Start Date
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {experience?.map((exp, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {exp?.company}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {exp?.role}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {exp?.year}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {exp?.startDate}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {exp?.endDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Education Details
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-x-auto rounded-lg">
                <table className="w-full min-w-[32rem] text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        Degree
                      </th>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        University
                      </th>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        Result
                      </th>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {education?.map((ed, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t border-[var(--border)] text-gray-400">
                          {ed?.degree}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400">
                          {ed?.institute}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400">
                          {ed?.result}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400">
                          {ed?.year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
            <div className="p-2 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-1 text-[var(--text)] relative">
                Bank Details
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>

              <div className="text-sm grid grid-cols-1 sm:grid-cols-3 space-y-2.5 pt-1">
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Account Holder :
                  </span>{" "}
                  <span className="text-gray-400">{bank?.accountHolder}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Bank Name :
                  </span>{" "}
                  <span className="text-gray-400">{bank?.bankName}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Account Number :
                  </span>{" "}
                  <span className="text-gray-400">
                    {bank?.accountHolder?.replace(/.(?=.{4})/g, "X")}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    IFSC Code :
                  </span>{" "}
                  <span className="text-gray-400">{bank?.ifsc}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">Branch :</span>{" "}
                  <span className="text-gray-400">{bank?.branch}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">UPI ID :</span>{" "}
                  <span className="text-gray-400">{bank?.upi}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          {openDialog && (
            <DialogBox
              setOpenDialog={setOpenDialog}
              setConfirmation={setConfirmation}
              title="Delete User"
              message={
                <p className="text-[var(--text)]">
                  Are you sure you want to delete
                  <div className="font-semibold text-red-600 relative inline-block">
                    {name}
                    <span className="w-full h-[1.5px] bottom-0 block absolute bg-red-600" />
                  </div>
                  profile? All of your data will be permanently removed. This
                  action cannot be undone
                </p>
              }
            />
          )}

          {/* ------------------------------------------------------------------------ */}

          {imagesFromDocs.length > 0 && (
            <ImageSlider
              images={imagesFromDocs}
              open={preview}
              setOpen={setPreview}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default UserAdditionalDetails;
