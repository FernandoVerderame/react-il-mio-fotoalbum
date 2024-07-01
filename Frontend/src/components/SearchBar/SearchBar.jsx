import { FaSearch as SearchIcon } from "react-icons/fa";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="input-group search-bar">
            <span className="input-group-text">
                <SearchIcon />
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Cerca foto..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBar;