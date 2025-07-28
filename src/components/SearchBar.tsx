import React from 'react';

interface SearchBarProps {
  searchLocation: string;
  setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (location: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchLocation,
  setSearchLocation,
  handleSearch,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchLocation);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchLocation(value);
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={searchLocation}
            onChange={handleInputChange}
            placeholder="Enter location (min. 3 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to search all locations, or enter at least 3 characters
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;