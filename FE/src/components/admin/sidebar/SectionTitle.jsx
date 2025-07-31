const SectionTitle = ({ title, isCollapsed }) => {
  if (isCollapsed) return <div className="h-4"></div>;

  return (
    <div className="px-6 py-3 border-b border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
