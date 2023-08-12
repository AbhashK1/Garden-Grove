import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const citiesArray = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
        'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const loadOptions = (inputValue) => {
        const filteredCities = citiesArray.filter(city =>
            city.toLowerCase().includes(inputValue.toLowerCase())
        );

        return Promise.resolve({
            options: filteredCities.map((city,index) => {
                return {
                    value: index,
                    label: city,
                };
            }),
        });
    };

    const handleOnChange = (searchData) => {
        onSearchChange(searchData);
        setSearch(searchData);
    };


    return (
        <AsyncPaginate
            placeholder="Search For State"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
