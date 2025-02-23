import { useEffect, useState } from "react";
import { useDebounce } from "../../../../../_metronic/helpers";
// import { useDebounce } from "../../../../../../../_metronic/helpers";

interface SearchComponentProps {
  onSearch: (searchTerm: string | undefined) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="card-title">
      {/* Search Input */}
      <div className="d-flex align-items-center position-relative my-1">
        <input
          type="text"
          className="form-control form-control-solid w-250px ps-4"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
