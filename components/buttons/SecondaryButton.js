export default function SecondaryButton({ icon, text, iconLeft, onClick }) {
  return (
    <button onClick={onClick} className="justify-center flex items-center gap-2 bg-transparent text-purple-950 hover:bg-purple-600 dark:text-purple-100 dark:hover:bg-purple-900 hover:text-white duration-500 transition-all px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-xs lg:text-sm poppins-medium">
      {iconLeft && icon}
      {text}
      {!iconLeft && icon}
    </button>
  );
}
