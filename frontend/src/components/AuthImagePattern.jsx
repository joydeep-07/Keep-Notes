
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-20 rounded-r-lg">
      {" "}
      {/* Replaced bg-base-200 */}
      <div className="max-w-sm  text-center">
        <div className="grid grid-cols-3 mt-10 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-[var(--accent-primary)] ${
                /* Replaced bg-primary/10 */
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-[var(--text-main)] ">
          {title}
        </h2>{" "}
        {/* Added text color */}
        <p className="text-[var(--text-secondary)] text-sm ">{subtitle}</p>{" "}
        {/* Replaced text-base-content/60 */}
      </div>
    </div>
  );
};

export default AuthImagePattern;