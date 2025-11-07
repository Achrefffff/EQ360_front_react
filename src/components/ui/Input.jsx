const Input = ({ label, error, className = '', compact = false, ...props }) => {
  return (
    <div className={compact ? "mb-2" : "mb-4"}>
      {label && (
        <label className={`block font-medium text-gray-700 ${compact ? "text-xs mb-0.5" : "text-sm mb-1"}`}>
          {label}
        </label>
      )}
      <input
        className={`w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          compact ? "px-3 py-1.5 text-sm" : "px-3 py-2"
        } ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
