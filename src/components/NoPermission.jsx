export default function NoPermission() {
  return (
    <div className="h-[calc(100vh-62px)] rounded-lg flex-col items-center justify-center bg-[var(--background)] px-4">
      <img
        src="/permission.png"
        alt="Page Not Found"
        className="animate__animated animate__zoomInUp mx-auto w-full max-w-[30rem] 2xl:max-w-[50rem]"
        style={{
          filter: "drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))",
        }}
      />

      <h1 className="animate__animated animate__zoomInUp text-center text-[var(--text)] text-sm md:text-3xl 2xl:text-4xl">
        You don’t have permission to view this page
      </h1>
    </div>
  );
}
