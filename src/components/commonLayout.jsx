import UpDownBtn from "./UpDownBtn";

const CommonLayout = ({ children }) => {
  return (
    <>
      <div className="max-w-screen md:max-w-[49rem] lg:max-w-full">
        <div
          className={`bg-[var(--background)] rounded-2xl p-[0.3rem_0px_0px_0px] `}
        >
          {children}
        </div>

        <UpDownBtn />
      </div>
    </>
  );
};

export default CommonLayout;
