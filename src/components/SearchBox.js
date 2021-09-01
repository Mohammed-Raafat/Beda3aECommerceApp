import React, { useState, /*useEffect*/ } from 'react';
import { connect } from 'react-redux';
import { Link } from '@material-ui/core';
import { Button, Input } from 'semantic-ui-react';
import { setFilteredProducts } from './../store/actions';

const SearchBox = (props) => {
    const { loading, products, setFilteredProducts } = props;
    const [searchTerm, setSearchTerm] = useState('');
    /*
    const [category, setCategory] = useState('all');
    
    const options = [
        ...[{ key: 'all', text: 'All', value: 'all' }],
        ...categories.map(categ => ({key: categ, text: categ.charAt(0).toUpperCase() + categ.substring(1), value: categ}))
    ];

    const handleDropdownChange = (e, data) => {
        setCategory(data.value);
    }; 
    */

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleSubmit = () => {
        if(searchTerm !== '') {
            const newFilterdProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
            if(newFilterdProducts.length === 0) {
                alert('No results found.');
            } else {
                setFilteredProducts(newFilterdProducts);
            }
            setSearchTerm('');
        }
    };

    const handleClearSearch = () => {
        console.log('Cleared');
    };

    return (
        <React.Fragment>
            <Input type='text' placeholder='Search...' action fluid disabled={loading}>
                <input value={searchTerm} onChange={handleChange}/>
                <Button type='submit' onClick={handleSubmit} icon='search'></Button>
            </Input>
            <Link component='button' onClick={handleClearSearch}  underline='none' color="secondary">Clear search</Link>
        </React.Fragment>
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
 
const mapStateToProps = (state) => {
    return {
        loading: state.products.loading,
        products: state.products.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFilteredProducts: (newProducts) => dispatch(setFilteredProducts(newProducts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);