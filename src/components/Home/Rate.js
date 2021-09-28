import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
//import StarIcon from '@mui/icons-material/Star';

const Rate = (props) => {
    const {rating, count} = props;
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5}
        /* onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} */
      />
        <Box sx={{ ml: 2 }}>({count})</Box>
    </Box>
  );
}

export default Rate;