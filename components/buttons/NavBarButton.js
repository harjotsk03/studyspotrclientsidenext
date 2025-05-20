export default function NavBarButton({icon,text, onClick, isActive}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${
        isActive && "bg-purple-600 dark:bg-purple-900 text-white"
      } gap-2 text-purple-950 dark:text-purple-50 hover:bg-purple-600 dark:hover:bg-purple-900 duration-500 hover:text-white transition-all px-6 py-3 rounded-lg text-sm poppins-medium`}
    >
      {icon}
      {text}
    </button>
  );
}
