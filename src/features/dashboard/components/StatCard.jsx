const StatCard = ({ title, mainValue, subValue, color, bgColor }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {title}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-4xl font-bold" style={{ color }}>
          {mainValue}
        </p>
        {subValue && (
          <p className="text-sm text-gray-500">{subValue}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
