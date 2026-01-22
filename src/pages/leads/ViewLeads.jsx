import React, { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { LeadsHeading } from "../../utils/ReuseData";
import { StatusBtn } from "../../components/StatusBtn";
import Pagination from "../../components/Pagination";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";
import AddVendor from "./AddVendor";
import VendorHeader from "../../components/vendor/VendorHeader";
import { useViewLeadsQuery } from "../../features/leads/leadsSlice";

const ViewLeads = ({ setStep, setLeadsId }) => {
  const { token } = useAuth();

  /* ----------------------------- UI STATE ----------------------------- */
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("all");
  const [query, setQuery] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [rows, setRows] = useState([]);
  const [TotalPages, setTotalPages] = useState(0);

  const [openAddForm, setOpenAddFrom] = useState(false);
  const [sortingKey, setSortingKey] = useState("ASC");
  const [sortingValue, setSortingValue] = useState("lead_id");

  /* ---------------------------- QUERY INPUT ---------------------------- */
  const queryVendor = {
    token,
    pageno: currentPage,
    pagesize: itemsPerPage,
    searchkey: query ? searchKey : "all",
    searchvalue: query ?? null,
    sortkey: sortingKey,
    sortcol: sortingValue,
    action: "viewall",
  };

  /* ---------------------------- RTK QUERY ------------------------------ */
  const { data, isLoading } = useViewLeadsQuery(queryVendor);
  console.log(data);

  /* ----------------------- SYNC DATA → STATE --------------------------- */
  useEffect(() => {
    if (data?.body) {
      setRows(data?.body?.lead || []);
      // setTotalPages(data. || 0);
    }
  }, [data]);

  /* ----------------------------- SORTING ------------------------------- */
  const handleSorting = (item) => {
    if (!item.status) return;
    const newOrder =
      sortingValue === item.name && sortingKey === "ASC" ? "DESC" : "ASC";

    setSortingKey(newOrder);
    setSortingValue(item.name);
    setCurrentPage(1);
  };

  /* -------------------------- TABLE HEADERS ---------------------------- */

  const SortingFields = () => {
    return (
      <>
        {LeadsHeading?.map((item) => {
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
                      item.name === sortingValue
                        ? sortingKey === "ASC"
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
      <VendorHeader
        setOpenAddFrom={setOpenAddFrom}
        setQuery={setQuery}
        setSearchKey={setSearchKey}
      />
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
                  rows?.map((Info) => (
                    <RenderDataUi
                      key={Info?.vendor_id}
                      RenderInfo={Info}
                      setStep={setStep}
                      setLeadsId={setLeadsId}
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

const RenderDataUi = ({ RenderInfo, setStep, setLeadsId }) => {
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
  } = RenderInfo || {};
  return (
    <>
      <tr
        onClick={() => {
          setStep(2);
          setLeadsId(lead_id);
        }}
        className="hover:bg-[var(--hoverTable)] transition-colors duration-200"
      >
        <td
          className={`pl-8 py-4 whitespace-nowrap text-xs rounded-l-2xl text-[var(--text)]`}
        >
          {lead_id}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {number}
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-xs font-medium text-[var(--text)]`}
        >
          {companyname}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
        >
          {team_id}
        </td>
        <td
          className={`px-5 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {emailid}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {requirement}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {source}
        </td>
        <td
          className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {file}
        </td>
        <td
          className={`px-10 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {assignedto}
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
        >
          {date}
        </td>
        <td className="pl-5 py-4 whitespace-nowrap rounded-r-2xl">
          <StatusBtn Status={status} />
        </td>
      </tr>
    </>
  );
};

export default ViewLeads;
