import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FormGroup, FormControl, FormControlLabel, Checkbox, Typography, List, ListItem } from '@material-ui/core';
import { capitalizeFirstLetter } from '../OwnMethods';
import { setCategoriesFilter } from '../store/actions';
import { connect } from 'react-redux';

const CheckBoxList = (props) => {
    const { loading, title, checkBoxList, setCategoriesFilter } = props;
    
    const titleId = title.toLowerCase().replace(' ', '-');

    const handleChange = (event) => {
        setCategoriesFilter({ ...checkBoxList, [event.target.name]: event.target.checked });
    };

    const renderedList = Object.keys(checkBoxList).map(checkbox => {
        return (
            <ListItem key={checkbox}>
                <FormControlLabel
                    control={<Checkbox checked={checkBoxList.checkbox} onChange={handleChange} name={checkbox} color="primary"/>}
                    label={capitalizeFirstLetter(checkbox)}
                />
            </ListItem>
        );
    });

    const renderedSkeletonList = (
        <Skeleton style={{width: 180, margin: '15px'}} count={4}/>
    );
    

    return (
        <FormControl component="fieldset">
            <Typography id={`${titleId}-checkbox-list`} variant="h6" gutterBottom>
                {title}:
            </Typography>

            {//Object.keys(checkBoxList).length === 0?
                loading?
                renderedSkeletonList
                :
                <FormGroup row>
                    <List>{renderedList}</List>
                </FormGroup>
            }
        </FormControl>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.products.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCategoriesFilter: (categories) => dispatch(setCategoriesFilter(categories))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxList);