import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paddingTopDown: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  paddingRightLeft: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  dash: {
    textAlign: 'center'
  },
}));

const RangeSlider = ({ loading, title, start, end, getPriceFilteration }) => {
  const titleId = title.toLowerCase().replace(' ', '-');
  const [value, setValue] = useState([start, end]);
  
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleInputChange = (event, index) => {
    if(index === 0) {
      setValue([Number(event.target.value), value[1]]);
    } else if(index === 1) {
      setValue([value[0], Number(event.target.value)]);
    }
  };
  
  const handleBlur = () => {
    if(value[0] < start) {
      setValue([start, value[1]]);
    } else if(value[1] > end) {
      setValue([value[0], end]);
    } else if(value[0] > value[1] && value[1] !== 0) {
      setValue([value[1], value[0]])
    } else if(value[1] < value[0]) {
      if(value[1] === 0) {
        setValue([value[0], end])
      } else {
        setValue([value[1], value[0]])
      }
    }
  };

  useEffect(() => {
    setValue([start, end]);
  }, [start, end]);
  
  const handleApplyClick = () => {
    getPriceFilteration(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography id={`${titleId}-range-slider`} display="inline" variant="h6" gutterBottom>{title}:</Typography>
      </Grid>

      <Grid item xs={12} className={classes.paddingRightLeft}>
        <Slider
          disabled={loading}
          min={start}
          max={end}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </Grid>

      <Grid container direction='row' justify='center' style={{margin: 'auto'}}>
        <div>
        <Grid item container direction='row' alignItems='center' xs={12} className={classes.paddingTopDown}>
          <Grid item xs={5}>
            <TextField value={value[0]} onBlur={handleBlur} onChange={(e) => handleInputChange(e, 0)} id={`${titleId}-start-number`} type="number" variant="outlined" size="small" disabled={loading}/>
          </Grid>
          <Grid item xs={2} className={classes.dash}>
            <span>&nbsp;<b>&#8211;</b>&nbsp;</span>
          </Grid>
          <Grid item xs={5}>
            <TextField value={value[1]} onBlur={handleBlur} onChange={(e) => handleInputChange(e, 1)} id={`${titleId}-end-number`} type="number" variant="outlined" size="small" disabled={loading}/>
          </Grid>
        </Grid>
        </div>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={handleApplyClick} size='tiny' floated='right' primary compact disabled={loading}>Apply</Button>
      </Grid>
    </Grid>
  );
}

export default RangeSlider;