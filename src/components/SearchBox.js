import React, { useState, useEffect } from 'react';
import { Button, Select, Input } from 'semantic-ui-react';

const SearchBox = ({ categories, getSearchAndCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    
    const options = [
        ...[{ key: 'all', text: 'All', value: 'all' }],
        ...categories.map(categ => ({key: categ, text: categ.charAt(0).toUpperCase() + categ.substring(1), value: categ}))
    ];

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    
    const handleDropdownChange = (e, data) => {
        setCategory(data.value);
    };
    
    const handleSubmit = () => {
        if(searchTerm !== '') {
            getSearchAndCategory({
                searchTerm,
                category
            });
        }
    };

    return (
        <Input type='text' placeholder='Search...' action fluid>
            <input value={searchTerm} onChange={handleChange}/>
            <Button type='submit' onClick={handleSubmit} icon='search'></Button>
        </Input>
        /*<div>
            <TextField label="Search..." variant="outlined" />
            <Button onClick={handleSubmit} type='submit'>Search</Button>
        </div>*/
        /* <Input type='text' placeholder='Search...' action>
            <input value={searchTerm} onChange={handleChange}/>
            <Select options={options} defaultValue='all' onChange={handleDropdownChange} />
            <Button onClick={handleSubmit} type='submit'>Search</Button>
        </Input> */
    );
}
 
export default SearchBox;