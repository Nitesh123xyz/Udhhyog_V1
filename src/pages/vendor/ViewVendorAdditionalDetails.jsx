import { useState } from "react";
import { employees } from "../../utils/DummyData";
import ImageSlider from "../../components/ImageSlider";
import { Trash } from "lucide-react";
import DialogBox from "../../components/DialogBox";
import ScrollTop from "../../utils/ScrollTop";
import { useDeleteUserMutation } from "../../features/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useViewVendorAdditionalInfoQuery } from "../../features/vendor/vendorSlice";
import VendorAdditionalDetailsHeader from "../../components/VendorAdditionalDetailsHeader";
import AddVendorAdditionalDetails from "./AddVendorAdditionalDetails";
import "../../css/commonLayout.css";
const ViewVendorAdditionalDetails = ({ step, setStep, vendorId }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enableDeleteBtn, setEnableDeleteBtn] = useState(false);
  const rows = [...employees.filter((e) => e.id === vendorId)];
  const { documents } = rows[0] || [];
  const { token } = useAuth();
  const [DeleteUserInformation] = useDeleteUserMutation();
  const imagesFromDocs = (documents || []).map((d) => ({
    src: d.url,
    alt: d.type,
  }));

  // -----------------------------------------------------------------------

  const BasicPayload = {
    token,
    vendor_id: vendorId,
    action: "view",
    subaction: "one",
  };

  const { data: Info } = useViewVendorAdditionalInfoQuery(BasicPayload);

  const { address, bankdetail, basic, contact, document } = Info?.body || {};
  const { companyname, com_emailid, com_gst, com_type, credittime } =
    basic?.[0] || {};
  const { acc_no, bank_name, branch_name, ifsc_code } = bankdetail || [];

  // -----------------------------------------------------------------------

  // const handleRefetch = useCallback(() => {
  //   refetch();
  // }, [refetch]);

  // useEffect(() => {
  //   handleRefetch();
  // }, [handleRefetch]);

  // -------------------------------------------------------

  const handleDeleteUserInfo = async (rowId, blockName) => {
    try {
      const delData = {
        token,
        emp_id: vendorId,
        id: rowId,
        block: blockName,
      };

      const { status } = await DeleteUserInformation(delData).unwrap();

      if (status) {
        toast.success(`${blockName} deleted successfully`);
        // refetch();
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
          <VendorAdditionalDetailsHeader
            setOpen={setOpen}
            step={step}
            setStep={setStep}
            setOpenDialog={setOpenDialog}
          />
        </div>
        {/* {isLoading && <Loader />} */}
        <div className="mx-auto space-y-2 min-h-screen 2xl:min-h-[calc(100vh-130px)]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="p-2 rounded-lg border border-[var(--border)]">
              <h3 className="font-semibold mb-2 text-[var(--text)] relative uppercase">
                Basic Information
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>
              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 divide-x divide-y divide-[var(--border)]">
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Company Name :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">
                    {companyname}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Email : </span>
                  {com_emailid && (
                    <Link
                      to={`mailto:${com_emailid}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {com_emailid}
                    </Link>
                  )}
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]"> GST :</span>
                  <span className="text-gray-400 capitalize"> {com_gst}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Company Type :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{com_type}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Credit Time :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{credittime}</span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--border)]">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-[var(--text)] relative uppercase">
                  Contacts
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
                <table className="w-full text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        Name
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        Email
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        Designation
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        Phone 1
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        Phone 2
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact?.map((Info, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.person_name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.contact_emailid}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.designation}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {Info?.phoneno1 !== "0" && (
                            <Link
                              to={`tel:${Info?.phoneno1}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400 uppercase"
                            >
                              {Info?.phoneno1}
                            </Link>
                          )}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          {Info?.phoneno2 !== "0" && (
                            <Link
                              to={`tel:${Info?.phoneno2}`}
                              className="text-gray-400 hover:underline hover:decoration-yellow-400 uppercase"
                            >
                              {Info?.phoneno2}
                            </Link>
                          )}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(Info?.id, "contact")
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
                <h3 className="font-semibold text-[var(--text)] relative uppercase">
                  ADDRESS
                  <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
                </h3>
              </div>

              <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
                <table className="w-full min-w-[32rem] text-sm table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        NAME
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        ADDRESS
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        GST
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        PIN CODE
                      </th>
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        TYPE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {address?.map((Info, i) => (
                      <tr key={i} className="hover:bg-[var(--permissionTable)]">
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.short_name}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.vendor_address}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.gst}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.pincode}
                        </td>
                        <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                          {Info?.add_type}
                        </td>
                        {enableDeleteBtn && (
                          <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                            <div
                              onClick={() =>
                                handleDeleteUserInfo(Info?.id, "address")
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
              <h3 className=" inline-block font-semibold mb-1 relative text-[var(--text)] uppercase">
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

          <div className="p-2 rounded-lg border border-[var(--border)]">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-[var(--text)] relative uppercase">
                Bank Details
                <span className="w-full h-[1.4px] bottom-[-3px] block absolute bg-[var(--border)]" />
              </h3>
            </div>

            <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scroll">
              <table className="w-full min-w-[45rem] text-sm table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                      Account Holder
                    </th>
                    <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                      Account Number
                    </th>
                    <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                      Bank Name
                    </th>
                    <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                      IFSC Code
                    </th>
                    <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                      Branch Address
                    </th>
                    {enableDeleteBtn && (
                      <th className="text-left text-[var(--text)] p-2 border-b border-[var(--border)] uppercase">
                        {/* Action */}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {bankdetail?.map((bd, i) => (
                    <tr key={i} className="hover:bg-[var(--permissionTable)]">
                      <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                        {companyname}
                      </td>
                      <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                        {bd?.acc_no?.replace(/.(?=.{4})/g, "X")}
                      </td>
                      <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                        {bd?.bank_name}
                      </td>
                      <td className="p-2 border-t text-gray-400 border-[var(--border)] uppercase">
                        {bd?.ifsc_code}
                      </td>
                      <td className="p-2 border-t text-gray-400 border-[var(--border)] capitalize">
                        {bd?.branch_name}
                      </td>
                      {enableDeleteBtn && (
                        <td className="p-2 border-t text-gray-400 border-[var(--border)]">
                          <div
                            onClick={() => handleDeleteUserInfo(bd?.id, "bank")}
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

          {/* ------------------------------------------------------------------------ */}

          <AddVendorAdditionalDetails
            vendor_id={vendorId}
            open={open}
            onClose={() => setOpen(false)}
          />

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

export default ViewVendorAdditionalDetails;
