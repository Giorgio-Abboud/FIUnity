import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from './api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}&limit=10`, geoApiOptions);
            if (response.status === 429) {
                throw new Error('Too Many Requests. Please try again later.');
            }
            const data = await response.json();
            console.log('API response:', data);

            if (data.data.length === 0) {
                throw new Error('No results found. Please try a different search term.');
            }

            return {
                options: data.data.map((city) => ({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                })),
            };
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            return {
                options: [],
            };
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
        setError(null);
    };

    return (
        <div>
            <AsyncPaginate
                placeholder="Location"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Search;
