type DataGridSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const DataGridSearch = ({
  value,
  onChange,
  placeholder = "Search...",
}: DataGridSearchProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        flex-1
        min-w-0
        rounded-md
        border
        border-gray-300
        dark:border-gray-600
        bg-white
        dark:bg-gray-900
        text-gray-900
        dark:text-gray-100
        px-3
        py-2
        text-sm
        focus:ring-2
        focus:ring-blue-500
        focus:outline-none
      "
    />
  );
};

export default DataGridSearch;
