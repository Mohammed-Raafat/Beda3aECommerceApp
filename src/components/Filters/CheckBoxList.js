import React from "react";
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
} from "@material-ui/core";

import { capitalizeFirstLetter } from "../../HelperFunctions";
import { setCategoriesFilter } from "../../store/actions";

const CheckBoxList = (props) => {
  const { loading, title, checkBoxList, setCategoriesFilter } = props;

  const handleChange = (event) => {
    setCategoriesFilter({
      ...checkBoxList,
      [event.target.name]: event.target.checked,
    });
  };

  const renderedList = Object.keys(checkBoxList).map((checkbox) => {
    return (
      <ListItem key={checkbox}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkBoxList.checkbox}
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
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>{title}:</Typography>

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
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.products.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategoriesFilter: (categories) =>
      dispatch(setCategoriesFilter(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxList);