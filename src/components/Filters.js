import React from 'react';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Placeholder } from 'semantic-ui-react'
import CheckBoxList from './CheckBoxList';
import RangeSlider from './RangeSlider';
import Skeleton from 'react-loading-skeleton';

const Filters = (props) => {
    return (
        <Grid style={{padding: 5}}>
            <CheckBoxList
                title='Categories'
                checkBoxList={props.filteredCategories}
                getCategoriesFilteration={props.getCategoriesFilteration}
            />
            <Divider />
            <RangeSlider
                loading={props.loading}
                title='Price ($)'
                start={props.price.start}
                end={props.price.end}
                getPriceFilteration={props.getPriceFilteration}
            />
        </Grid>
    );
}
 
export default Filters;