import { useState } from "react";
import { employees } from "../../utils/DummyData";
import ImageSlider from "../../components/ImageSlider";
import { Trash, Undo2, UserPen } from "lucide-react";

const UserAdditionalDetails = ({ setStep, employeesId }) => {
  const [preview, setPreview] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const rows = [...employees.filter((e) => e.id === employeesId)];
  const {
    name,
    jobTitle,
    contact,
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

  return (
    <>
      <section className="bg-[var(--background)] backdrop-blur-md rounded-lg px-2 py-2">
        <div className="mx-auto space-y-4 lg:h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-2 text-[var(--text)] relative">
                Contact & Identity
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>
              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 space-y-2">
                <div>
                  <span className="font-medium text-[var(--text)]">Name :</span>{" "}
                  <span className="text-[var(--text)]">{name}</span>
                </div>{" "}
                <div>
                  <span className="font-medium text-[var(--text)]">Job :</span>{" "}
                  <span className="text-[var(--text)]">{jobTitle}</span>
                </div>{" "}
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Email ID :
                  </span>{" "}
                  <span className="text-[var(--text)]">{contact?.email}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Phone Number :
                  </span>{" "}
                  <span className="text-[var(--text)]">{contact?.phone}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Date of Birth :
                  </span>{" "}
                  <span className="text-[var(--text)]">{contact?.dob}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Marital Status :
                  </span>{" "}
                  <span className="text-[var(--text)]">
                    {contact?.maritalStatus}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Blood Group :
                  </span>{" "}
                  <span className="text-[var(--text)]">
                    {contact?.bloodGroup}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Address :
                  </span>{" "}
                  <span className="text-[var(--text)]">{contact?.address}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Emergency Contacts
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg">
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
                      <tr
                        key={i}
                        className="hover:bg-[var(--background-hover)]"
                      >
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {ec?.name}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {ec?.relation}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {ec?.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Family Details
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Name
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Relation
                      </th>{" "}
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
                      <tr
                        key={i}
                        className="hover:bg-[var(--background-hover)]"
                      >
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {f?.name}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {f?.relation}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {f?.dob}
                        </td>{" "}
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {f?.occupation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Experience
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Company
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Role
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
                      <tr
                        key={i}
                        className="hover:bg-[var(--background-hover)]"
                      >
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {exp?.company}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {exp?.role}
                        </td>
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {exp?.startDate}
                        </td>{" "}
                        <td className="p-2 border-t text-[var(--text)] border-[var(--border)]">
                          {exp?.endDate}
                        </td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--text)] relative">
                  Education Details
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        Degree
                      </th>
                      <th className="text-left p-2 border-b border-[var(--border)] text-[var(--text)]">
                        Institute / University
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
                      <tr
                        key={i}
                        className="hover:bg-[var(--background-hover)]"
                      >
                        <td className="p-2 border-t border-[var(--border)] text-[var(--text)]">
                          {ed?.degree}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-[var(--text)]">
                          {ed?.institute}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-[var(--text)]">
                          {ed?.result}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-[var(--text)]">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-2 text-[var(--text)] relative">
                Bank Details
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>

              <div className="text-sm grid grid-cols-1 sm:grid-cols-3 space-y-2">
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Account Holder :
                  </span>{" "}
                  <span className="text-[var(--text)]">
                    {bank?.accountHolder}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Bank Name :
                  </span>{" "}
                  <span className="text-[var(--text)]">{bank?.bankName}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Account Number :
                  </span>{" "}
                  <span className="text-[var(--text)]">
                    {bank?.accountHolder?.replace(/.(?=.{4})/g, "X")}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    IFSC Code :
                  </span>{" "}
                  <span className="text-[var(--text)]">{bank?.ifsc}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    Branch :
                  </span>{" "}
                  <span className="text-[var(--text)]">{bank?.branch}</span>
                </div>
                <div>
                  <span className="font-medium text-[var(--text)]">
                    UPI ID :
                  </span>{" "}
                  <span className="text-[var(--text)]">{bank?.upi}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-3 relative text-[var(--text)]">
                Documents Preview
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>

              <div className="space-y-2">
                {documents?.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="text-sm font-medium text-[var(--text)] flex-1">
                      {doc?.type}
                    </div>

                    <div className="text-sm font-medium text-[var(--text)] flex-1 tracking-wider">
                      {doc?.doc?.replace(/.(?=.{4})/g, "X")}
                    </div>

                    {imagesFromDocs.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedIndex(i);
                              setPreview(true);
                            }}
                            className="px-3 py-1 rounded border border-[var(--border)] text-[var(--text)] text-sm cursor-pointer"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          <div className="flex justify-end gap-3 my-0">
            <button
              onClick={() => setStep(3)}
              className="px-2 py-2 rounded-full bg-yellow-400 text-black border border-yellow-500 cursor-pointer"
            >
              <UserPen className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert("Profile removed (mock).")}
              className="px-2 py-2 bg-yellow-400 text-black border border-yellow-500 rounded-full cursor-pointer"
            >
              <Trash className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStep(1)}
              className="px-2 py-2 rounded-full bg-yellow-400 text-black border border-yellow-500 cursor-pointer"
            >
              <Undo2 className="w-5 h-5" />
            </button>
          </div>
          {imagesFromDocs.length > 0 && (
            <div className="max-w-4xl mx-auto p-4">
              <ImageSlider
                images={imagesFromDocs}
                open={preview}
                setOpen={setPreview}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserAdditionalDetails;
