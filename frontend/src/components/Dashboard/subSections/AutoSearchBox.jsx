import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const AutoSearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const AUTO_COMPLETE_PLACES_API_KEY = "8e3aea867emsh6783f2175546b2bp1a654fjsn2b41fa6818fa";

    async function handleRequest() {
        const url = `https://map-places.p.rapidapi.com/autocomplete/json?input=${searchQuery}&radius=500000&location=india`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': AUTO_COMPLETE_PLACES_API_KEY,
                'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setSearchResults(result.predictions);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        // Clear search results if search query is empty
        if (!value.trim()) {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        handleRequest();
    };

    return (
        <div>
            <h1>Map</h1>
            <section className="w-[300px]">
                <label htmlFor="region" className="p-2 block">
                    Filter By Region
                </label>
                <form onSubmit={handleSearchSubmit} className="w-full flex max-h-20 items-center">
                    <input
                        onChange={handleSearchChange}
                        value={searchQuery}
                        className="block px-3 py-2 min-w-[250px] outline-offset-2 outline-blue-700 bg-white border-2 text-sm"
                        type="search"
                        id="region"
                        placeholder="Enter State or City"
                    />

                </form>
                {searchResults.length > 0 && (
                    <div className="bg-white p-2 flex flex-col overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
                        {searchResults.map((result, index) => (
                            <div key={index}>
                                <p className="my-2 p-1 ">{result.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AutoSearchBox;
