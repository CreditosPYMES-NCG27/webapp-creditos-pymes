import './SearchBar.css';

export default function SearchBar({ 
  placeholder = "Buscar...", 
  value = "", 
  onChange,
  className = ""
}) {
  
  return (
    <div className={`search-bar-container ${className}`}>
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="search-bar-icon" type="button">
          🔍
        </button>
      </div>
    </div>
  );
}