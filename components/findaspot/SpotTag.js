export default function SpotTag ({ label, isLast }) {
  return (
    <div
      className={`w-max poppins-regular text-black/40 dark:text-white/30 text-xs flex flex-row items-center gap-2`}
    >
      {label}
      {!isLast && (
        <div className="w-1 h-1 bg-black/40 dark:bg-white/30 rounded-full"></div>
      )}
    </div>
  );
};
