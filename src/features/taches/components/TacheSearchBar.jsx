import { Search, X } from "lucide-react";

const TacheSearchBar = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Rechercher une tâche..."
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default TacheSearchBar;
