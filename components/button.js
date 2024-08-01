export default function Button({ children, ...props }) {
  return (
    <button
      className="flex w-fit items-center rounded h-12 px-5 py-3 bg-gray-90 dark:bg-gray-variant-90 text-white text-sm"
      {...props}
    >
      {children}
    </button>
  );
}
