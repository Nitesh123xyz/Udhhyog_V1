import { useCallback, useEffect, useState } from "react";
import { employees } from "../../utils/DummyData";
import ImageSlider from "../../components/ImageSlider";
import { Trash } from "lucide-react";
import DialogBox from "../../components/DialogBox";
import ScrollTop from "../../utils/ScrollTop";
import UserAdditionalDetailsHeader from "../../components/user/UserAdditionalDetailsHeader";
import {
  useDeleteUserMutation,
  useUsersAdditionalDetailsQuery,
} from "../../features/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { formatDateToIndian, formatRupees } from "../../utils/formatter";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import "../../css/commonLayout.css";
const UserAdditionalDetails = ({ step, setStep, employeesId }) => {
  const [preview, setPreview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(false);
  const rows = [...employees.filter((e) => e.id === employeesId)];
  const { documents } = rows[0] || [];
  const { token } = useAuth();
  const [DeleteUserInformation] = useDeleteUserMutation();
  const imagesFromDocs = (documents || []).map((d) => ({
    src: d.url,
    alt: d.type,
  }));

  const { data, refetch, isLoading } = useUsersAdditionalDetailsQuery({
    emp_id: employeesId,
    token: token,
  });

  const {
    name,
    email,
    salary,
    job_title,
    job_status,
    joining_date,
    marital_status,
    phone_no,
    whatsapp_no,
    address,
    bank_name,
    acc_no,
    blood_group,
    department,
    dob,
    ifsc_no,
    branchname,
    status,
    incentive,
    // -------
    emergency,
    experience,
    family,
    education,
  } = data?.body || {};

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    handleRefetch();
  }, [handleRefetch]);

  // -------------------------------------------------------

  const handleDeleteUserInfo = async (rowId, blockName) => {
    try {
      const delData = {
        token,
        emp_id: employeesId,
        id: rowId,
        block: blockName,
      };

      const { status } = await DeleteUserInformation(delData).unwrap();

      if (status) {
        toast.success(`${blockName} deleted successfully`);
        refetch();
      } else {
        toast.error(`Failed to delete ${blockName}`);
      }
    } catch (err) {
      console.error("delete error", err);
      toast.error("Something went wrong while deleting");
    }
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
        {isLoading && <Loader />}
        <div className="mx-auto space-y-2 min-h-screen 2xl:min-h-[calc(100vh-130px)]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-2 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-2 text-[var(--text)] relative">
                Contact & Identity
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>
              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 divide-x divide-y divide-[var(--border)]">
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Name :</span>{" "}
                  <span className="text-gray-400 capitalize">{name}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Email :</span>{" "}
                  {email && (
                    <Link
                      to={`mailto:${email}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {email}
                    </Link>
                  )}
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Phone :</span>{" "}
                  {phone_no && (
                    <Link
                      to={`tel:${phone_no}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {phone_no}
                    </Link>
                  )}
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Whatsapp :
                  </span>{" "}
                  {whatsapp_no && (
                    <Link
                      to={`https://wa.me/${whatsapp_no}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {whatsapp_no}
                    </Link>
                  )}
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">DOB :</span>{" "}
                  <span className="text-gray-400">
                    {formatDateToIndian(dob)}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Job :</span>{" "}
                  <span className="text-gray-400 capitalize">{job_title}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Job Status :
                  </span>{" "}
                  <span className="text-gray-400 capitalize">{job_status}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Department :
                  </span>{" "}
                  <span className="text-gray-400 capitalize">{department}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Joining Date :
                  </span>{" "}
                  <span className="text-gray-400">
                    {formatDateToIndian(joining_date)}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Salary :</span>{" "}
                  <span className="text-gray-400">{formatRupees(salary)}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Marital Status :
                  </span>{" "}
                  <span className="text-gray-400 capitalize">
                    {marital_status}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Blood Group :
                  </span>{" "}
                  <span className="text-gray-400 uppercase">{blood_group}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Status :</span>{" "}
                  <span className="text-gray-400">
                    {status ? "Active" : "InActive"}
                  </span>
                </div>{" "}
                {incentive > 0 && (
                  <div className="p-2">
                    <span className="font-bold text-[var(--text)]">
                      Incentive :
                    </span>{" "}
                    <span className="text-gray-400">{incentive}</span>
                  </div>
                )}
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Address :
                  </span>{" "}
                  <span className="text-gray-400 capitalize">{address}</span>
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

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
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
                    {emergency?.map((ec, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {ec?.name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {ec?.relation}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {ec?.phone_no && (
                            <Link
                              to={`tel:${ec?.phone_no}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400 uppercase"
                            >
                              {ec?.phone_no}
                            </Link>
                          )}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(ec?.id, "emergency")
                              }
                              className="cursor-pointer w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
                            >
                              <Trash size={15} className="text-[var(--text)]" />
                            </div>
                          </td>
                        )}
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

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
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
                        Occupation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {family?.map((f, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {f?.name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {f?.relation}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {f?.phone_no && (
                            <Link
                              to={`tel:${f?.phone_no}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400 uppercase"
                            >
                              {f?.phone_no}
                            </Link>
                          )}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {f?.occupation}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(f?.id, "family")
                              }
                              className="cursor-pointer w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
                            >
                              <Trash size={15} className="text-[var(--text)]" />
                            </div>
                          </td>
                        )}
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

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
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
                        Start Date
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        End Date
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)]">
                        Years
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {experience?.map((exp, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                          {exp?.company}
                        </td>
                        <td className=" border-t text-gray-400 border-[var(--border)] capitalize">
                          {exp?.role}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                          {formatDateToIndian(exp?.start_date)}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                          {formatDateToIndian(exp?.end_date)}
                        </td>
                        <td className="p-3 border-t text-gray-400 border-[var(--border)] uppercase">
                          {exp?.end_date.slice(0, 4) -
                            exp?.start_date.slice(0, 4)}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(exp?.id, "experience")
                              }
                              className="cursor-pointer w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
                            >
                              <Trash size={15} className="text-[var(--text)]" />
                            </div>
                          </td>
                        )}
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

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
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
                        <td className="p-2 border-t border-[var(--border)] text-gray-400 uppercase">
                          {ed?.degree}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400 uppercase">
                          {ed?.university}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400 uppercase">
                          {ed?.result}
                        </td>
                        <td className="p-2 border-t border-[var(--border)] text-gray-400 uppercase">
                          {ed?.year}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(ed?.id, "education")
                              }
                              className="cursor-pointer w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
                            >
                              <Trash size={15} className="text-[var(--text)]" />
                            </div>
                          </td>
                        )}
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
                  <span className="text-gray-400 capitalize">{name}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Bank Name :
                  </span>{" "}
                  <span className="text-gray-400 uppercase">{bank_name}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Account Number :
                  </span>{" "}
                  <span className="text-gray-400 uppercase">
                    {acc_no?.replace(/.(?=.{4})/g, "X")}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    IFSC Code :
                  </span>{" "}
                  <span className="text-gray-400 uppercase">{ifsc_no}</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--text)]">
                    Branch Address :
                  </span>{" "}
                  <span className="text-gray-400 capitalize">{branchname}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------ */}

          {openDialog && (
            <DialogBox
              setOpenDialog={setOpenDialog}
              setConfirmation={setConfirmation}
              setEnableDeleteBtn={setEnableDeleteBtn}
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
