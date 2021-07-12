import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Skeleton from 'react-loading-skeleton';

const CheckBoxList = ({ title, checkBoxList, getCategoriesFilteration }) => {
    const titleId = title.toLowerCase().replace(' ', '-');

    const [state, setState] = useState(checkBoxList);
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        getCategoriesFilteration(state);
    }, [state]);

    const renderedList = Object.keys(checkBoxList).map(checkbox => {
        return (
            <ListItem key={checkbox}>
                <FormControlLabel
                    control={<Checkbox checked={state.checkbox} onChange={handleChange} name={checkbox} color="primary"/>}
                    label={checkbox.charAt(0).toUpperCase() + checkbox.substring(1)}
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
            {Object.keys(checkBoxList).length === 0?
                renderedSkeletonList
                :
                <FormGroup row>
                    <List>{renderedList}</List>
                </FormGroup>
            }
        </FormControl>
    );
};

export default CheckBoxList;