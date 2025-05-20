export default function PrimaryButton({ icon, text, iconLeft, onClick }) {
  return (
    <button onClick={onClick} className="text-center justify-center flex items-center gap-2 bg-purple-600 dark:bg-purple-700 text-white hover:bg-purple-900 dark:hover:bg-purple-900 duration-500 transition-all px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-xs lg:text-sm poppins-medium">
      {iconLeft && icon}
      {text}
      {!iconLeft && icon}
    </button>
  );
}
