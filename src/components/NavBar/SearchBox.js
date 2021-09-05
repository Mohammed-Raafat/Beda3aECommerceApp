import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input } from "semantic-ui-react";

import { setFilteredProducts } from "../../store/actions";

const SearchBox = (props) => {
  const { loading, products, setFilteredProducts } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (searchTerm !== "") {
      const newFilterdProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (newFilterdProducts.length === 0) {
        alert("No results found.");
      } else {
        setFilteredProducts(newFilterdProducts);
      }
      setSearchTerm("");
    }
  };

  const handleClearSearch = () => {
    console.log("Cleared");
  };
  /*const getSearchAndCategory = (obj) => {
        console.log(obj)
           const { searchTerm, category } = obj;
          const { products } = this.state;
    
          const categorizedProducts = (category === 'all')? products : products.filter(product => product.category === category);
    
          const newFilterdProducts = categorizedProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
          if(newFilterdProducts.length > 0) {
            this.setState({
              filteredProducts: newFilterdProducts,
              filteredPrice: this.getMinMax(newFilterdProducts, 'price')
            });
          } else {
            alert('No results found.');
          } 
        };*/

  return (
    <React.Fragment>
      <Input
        type="text"
        placeholder="Search..."
        action
        fluid
        disabled={loading}
      >
        <input value={searchTerm} onChange={handleChange} />
        <Button type="submit" onClick={handleSubmit} icon="search"></Button>
      </Input>
      {/* <Link component='button' onClick={handleClearSearch}  underline='none' color="secondary">Clear search</Link> */}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilteredProducts: (newProducts) =>
      dispatch(setFilteredProducts(newProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);