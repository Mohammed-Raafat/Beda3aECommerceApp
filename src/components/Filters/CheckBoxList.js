import React, { useEffect } from "react";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  List,
  ListItem,
} from "@mui/material";

import { capitalizeFirstLetter } from "../../HelperFunctions";
import { fetchCategories, setCategoriesFilter } from "../../store/actions";
import Toast from './../Toast';

const CheckBoxList = (props) => {
  const { loading, categories, errorMessage, fetchCategories, setCategoriesFilter, filteredCategories } = props;

  const handleChange = (event) => {
    setCategoriesFilter({
      ...filteredCategories,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderedList = categories.map((checkbox) => {
    return (
      <ListItem key={checkbox}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filteredCategories.checkbox}
              onChange={handleChange}
              name={checkbox}
              color="primary"
            />
          }
          label={capitalizeFirstLetter(checkbox)}
        />
      </ListItem>
    );
  });

  const renderedSkeletonList = (
    <Skeleton style={{ width: 180, margin: "15px" }} count={4} />
  );

  return (
    <React.Fragment>
      <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>Categories:</Typography>

      {
        loading ? (
          renderedSkeletonList
        ) : (
          <FormGroup row>
            <List>{renderedList}</List>
          </FormGroup>
        )
      }
    </FormControl>
    {errorMessage && (
      <Toast
        message={errorMessage}
        buttonText="Retry"
        buttonOnClick={fetchCategories}
        close
      />
    )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.categoriesReducer.loading,
    categories: state.categoriesReducer.categories,
    errorMessage: state.categoriesReducer.error,
    filteredCategories: state.filtersReducer.filteredCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    setCategoriesFilter: (categories) => dispatch(setCategoriesFilter(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxList);