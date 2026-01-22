import React, { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { VendorHeading } from "../../utils/ReuseData";
import { StatusBtn } from "../../components/StatusBtn";
import Pagination from "../../components/Pagination";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import { useViewVendorQuery } from "../../features/vendor/vendorSlice";
import AddVendor from "./AddVendor";
import VendorHeader from "../../components/vendor/VendorHeader";

const ViewVendor = ({ setStep, setVendorId }) => {
  const { token } = useAuth();

  /* ----------------------------- UI STATE ----------------------------- */
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [order, setOrder] = useState("_a");
  const [currentSort, setCurrentSort] = useState(null);
  const [currentActive, setCurrentActive] = useState(null);

  const [rows, setRows] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);

  const [vendorHeaderData, setVendorHeaderData] = useState(VendorHeading);
  const [openAddForm, setOpenAddFrom] = useState(false);

  /* ---------------------------- QUERY INPUT ---------------------------- */
  const queryVendor = {
    token,
    pageno: String(currentPage),
    pagesize: String(itemsPerPage),
    sortkey: currentSort,
    searchall: query ?? null,
    action: "view",
    subaction: "all",
  };

  /* ---------------------------- RTK QUERY ------------------------------ */
  const { data, isLoading } = useViewVendorQuery(queryVendor);

  /* ----------------------- SYNC DATA → STATE --------------------------- */
  useEffect(() => {
    if (data?.body) {
      setRows(data.body.basic || []);
      setTotalPages(data.body.trow || 0);
    }
  }, [data]);

  /* --------------------------- SEARCH DEBOUNCE ------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput.trim() === "" ? null : searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ----------------------------- SORTING ------------------------------- */
  const handleSorting = (field) => {
    if (!field?.status) return;

    const nextOrder = order === "_a" ? "_d" : "_a";
    const sortValue = `${field.name}_${nextOrder === "_a" ? "a" : "d"}`;

    setOrder(nextOrder);
    setCurrentActive(field.name);
    setCurrentSort(sortValue);
    setCurrentPage(1);

    setVendorHeaderData((prev) =>
      prev.map((it) => ({
        ...it,
        active: it.name === field.name,
      })),
    );
  };

  /* -------------------------- TABLE HEADERS ---------------------------- */

  const SortingFields = () => {
    return (
      <>
        {vendorHeaderData?.map((item) => {
          return (
            <th
              key={item.name}
              onClick={() => item.status && handleSorting(item)}
              className={`px-3 py-5 text-left text-xs bg-[var(--background)] text-[var(--text)] uppercase tracking-wider ${
                item.status ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-1 select-none">
                {item?.status && (
                  <ArrowDownUp
                    size={16}
                    className={`inline-block transform transition-transform duration-300 ${
                      item.name === currentActive
                        ? order === "_a"
                          ? "rotate-180"
                          : "rotate-0"
                        : "rotate-0 opacity-40"
                    }`}
                  />
                )}
                <span>{item?.label}</span>
              </div>
            </th>
          );
        })}
      </>
    );
  };

  return (
    <>
      <VendorHeader setQuery={setSearchInput} setOpenAddFrom={setOpenAddFrom} />

      <section className="max-w-screen">
        <div
          className={`bg-[var(--background)] backdrop-blur-sm  overflow-hidden lg:rounded-b-lg`}
        >
          <div className="overflow-x-auto px-2 max-h-screen h-[calc(100vh-169px)] sm:h-[calc(100vh-176px)]  NavScroll">
            {isLoading && <Loader />}
            <table className="w-full min-w-max table-auto">
              <thead className="sticky top-[-5px] lg:top-0 z-50">
                <tr>{SortingFields()}</tr>
              </thead>
              <tbody className={`divide-y  divide-[var(--border)]`}>
                {rows && rows.length > 0 ? (
                  rows?.map((vendor) => (
                    <RenderDataUi
                      key={vendor?.vendor_id}
                      vendor={vendor}
                      setStep={setStep}
                      setVendorId={setVendorId}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-[15%] text-[3rem] text-[var(--text)] text-center"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            startIndex={startIndex}
            endIndex={endIndex}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
            TotalPages={TotalPages}
          />
        </div>

        {openAddForm && <AddVendor setOpenAddFrom={setOpenAddFrom} />}
      </section>
    </>
  );
};

// --------------------------------------- VendorListUi

const RenderDataUi = ({ vendor, setStep, setVendorId }) => {
  return (
    <>
      <tr
        onClick={() => {
          setStep(2);
          setVendorId(vendor?.vendor_id);
        }}
        key={vendor?.vendor_id}
        className="hover:bg-[var(--hoverTable)] transition-colors duration-200"
      >
        <td
          className={`pl-8 py-4 whitespace-nowrap text-xs rounded-l-2xl text-[var(--text)]`}
        >
          {vendor?.vendor_id}
        </td>
        <td className="px-0 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <img
              src={
                vendor.avatar ||
                "https://cdn-icons-png.freepik.com/512/16524/16524724.png?uid=R213905709&ga=GA1.1.928608604.1757403767"
              }
              alt={vendor.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className={`text-xs text-[var(--text)] capitalize`}>
              {vendor.companyname}
            </span>
          </div>
        </td>

        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {vendor?.credittime}
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-xs font-medium text-[var(--text)]`}
        >
          {vendor.com_emailid}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
        >
          {vendor?.com_type}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {vendor?.com_gst}
        </td>
        <td className="pl-5 py-4 whitespace-nowrap rounded-r-2xl">
          <StatusBtn Status={vendor?.active} />
        </td>
      </tr>
    </>
  );
};

export default ViewVendor;
