import React, { useState } from "react";
import AddVendor from "./AddVendor";
import AddVendorAdditionalDetails from "./AddVendorAdditionalDetails";

const ViewVendor = () => {
  const [openAddForm, setOpenAddFrom] = useState(true);
  return (
    <>
      <>
        {/* {openAddForm && (
          <AddVendor isOpen={true} setOpenAddFrom={setOpenAddFrom} />
        )} */}
        <AddVendorAdditionalDetails />
      </>
    </>
  );
};

export default ViewVendor;
