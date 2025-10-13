export const StatusBtn = ({ Status }) => {
  const getStatusColor = (status) => {
    return status === "Inactive" ? "text-black" : "text--black";
  };

  const getStatusBg = (status) => {
    return status === 1 ? "bg-gray-200" : "bg-orange-100";
  };
  const getPointerColor = (status) => {
    return status === 1 ? "bg-green-400" : "bg-red-400";
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <span
          className={`inline-flex items-center px-4 py-2 rounded-full  ${getStatusColor(
            Status
          )} text-xs ${getStatusBg(Status)}`}
        >
          <span
            className={`w-2 h-2 mr-2 ${getPointerColor(Status)} rounded-full`}
          ></span>
          {Status === 1 ? "Active" : "Inactive"}
        </span>
      </div>
    </>
  );
};
