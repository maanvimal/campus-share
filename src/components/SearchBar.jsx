function SearchBar({ value, onChange }) {
  return (
    <div className="input-shell flex items-center gap-3 px-4 py-3">
      <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4.2-4.2" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search items..."
        className="w-full border-none bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

export default SearchBar;
