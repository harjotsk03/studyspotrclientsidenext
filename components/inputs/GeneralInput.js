export default function GeneralInput ({labelText, value, onChange, placeholder, required}) {
    return (
      <div className="flex flex-col gap-2">
        <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
          {labelText} {required && <span className="text-purple-500">*</span>}
        </label>
        <input
          autoFocus
          className="w-full text-black dark:text-white poppins-regular px-4 py-3 text-sm bg-white dark:bg-purple-400/10 border border-darkBG/20 dark:border-purple-300/10 dark:bg-darkBG focus:outline-none pr-14 rounded-md"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    );
}