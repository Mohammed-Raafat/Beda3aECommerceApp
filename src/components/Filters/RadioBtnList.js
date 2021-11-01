import React, { useState } from "react";
import { connect } from "react-redux";

import {
  FormControl,
  FormControlLabel,
  Typography,
  ListItem,
  Radio,
  RadioGroup,
} from "@mui/material";

import { setRatingFilter } from "../../store/actions";
import Rate from "../Rate";

const RadioBtnList = (props) => {
  const { loading, filteredRate, setRatingFilter } = props;
  const [value, setValue] = useState(filteredRate);

  const rates = [4, 3, 2, 1];
  const handleChange = (event) => {
    const value = Number(event.target.value);
    setValue(value);
    setRatingFilter(value);
  };

  const renderedList = rates.map((rate) => {
    return (
      <ListItem key={rate}>
        <FormControlLabel
          value={rate}
          control={<Radio />}
          label={<Rate rate={rate} text="& up" />}
          disabled={loading}
        />
      </ListItem>
    );
  });

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        Rating:
      </Typography>
      <RadioGroup
        aria-label="Rating"
        defaultValue={1}
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {renderedList}
      </RadioGroup>
    </FormControl>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.productsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRatingFilter: (rate) => dispatch(setRatingFilter(rate))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioBtnList);
