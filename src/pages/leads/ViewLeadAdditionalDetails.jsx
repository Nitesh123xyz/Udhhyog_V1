import { useState } from "react";
import DialogBox from "../../components/DialogBox";
import { useDeleteUserMutation } from "../../features/users/usersSlice";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import VendorAdditionalDetailsHeader from "../../components/vendor/VendorAdditionalDetailsHeader";
import { useViewLeadsAdditionalInfoQuery } from "../../features/leads/leadsSlice";
import "../../css/commonLayout.css";
import { formatDateToIndian } from "../../utils/formatter";

const ViewVendorAdditionalDetails = ({ step, setStep, leadsId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  const [DeleteUserInformation] = useDeleteUserMutation();

  // -----------------------------------------------------------------------

  const BasicPayload = {
    token,
    lead_id: leadsId,
    action: "viewone",
  };

  const { data, isLoading } = useViewLeadsAdditionalInfoQuery(BasicPayload);

  const {
    lead_id,
    number,
    companyname,
    team_id,
    emailid,
    requirement,
    source,
    file,
    assignedto,
    date,
    status,
  } = data?.body?.lead[0] || {};

  // -------------------------------------------------------

  const handleDeleteUserInfo = async (rowId, blockName) => {
    try {
      const delData = {
        token,
        emp_id: leadsId,
        id: rowId,
        block: blockName,
      };

      const { status } = await DeleteUserInformation(delData).unwrap();

      if (status) {
        toast.success(`${blockName} deleted successfully`);
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
        <div className="flex justify-end gap-3">
          <VendorAdditionalDetailsHeader
            setOpen={setOpen}
            step={step}
            setStep={setStep}
            setOpenDialog={setOpenDialog}
          />
        </div>
        {isLoading && <Loader />}
        <div className="mx-auto space-y-2 min-h-screen 2xl:min-h-[calc(100vh-130px)]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3">
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
                  <span className="font-bold text-[var(--text)]">
                    Number :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{number}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Email : </span>
                  {emailid && (
                    <Link
                      to={`mailto:${emailid}`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {emailid}
                    </Link>
                  )}
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Team ID :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{team_id}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Source :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{source}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Requirement :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">
                    {requirement}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Assigned :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{assignedto}</span>
                </div>{" "}
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">
                    Status :{" "}
                  </span>
                  <span className="text-gray-400 capitalize">{status}</span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">Date : </span>
                  <span className="text-gray-400 capitalize">
                    {formatDateToIndian(date)}
                  </span>
                </div>
                <div className="p-2">
                  <span className="font-bold text-[var(--text)]">File : </span>
                  {file && (
                    <Link
                      to={`google.com`}
                      className="text-gray-400 hover:underline hover:decoration-yellow-400"
                    >
                      {file}
                    </Link>
                  )}
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
        </div>
      </section>
    </>
  );
};

export default ViewVendorAdditionalDetails;
