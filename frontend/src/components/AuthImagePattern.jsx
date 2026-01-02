
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center w-md justify-center p-12 rounded-r-lg">
      {" "}
      {/* Replaced bg-base-200 */}
      <div className="w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-blue-300 ${
                /* Replaced bg-primary/10 */
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl heading text-[var(--text-secondary)] ">{title}</h2>{" "}
        {/* Added text color */}
        <p className="text-gray-600">{subtitle}</p>{" "}
        {/* Replaced text-base-content/60 */}
      </div>
    </div>
  );
};

export default AuthImagePattern;