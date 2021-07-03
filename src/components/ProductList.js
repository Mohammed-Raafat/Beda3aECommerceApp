import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'price', label: 'Price ($)', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 20 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const ProductList = (props) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [products, setProducts] = useState(props.products);
    let rows = products.map(({id, title, price, category, image}) => ({id, title, price, category, image}));
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortBy = (value) => {
            setProducts(products.sort((a, b) => {
                if(a[value] < b[value]) return -1;
                if(a[value] > b[value]) return 1;
                return 0;
            }));
        /* rows = products.map(({id, title, price, category}) => createData(id, title, price, category)); */
        console.log(products)
    };

    return (
        <Paper className={classes.root}>
            <button onClick={() => setProducts(props.products)}>Click</button>
            <button onClick={() => sortBy('price')}>Sort</button>

        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    <button onClick={() => sortBy(column.id)}>{column.label}</button>
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log(row.image)
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : column.id ==='image'? <img src={row.image}/> : value}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    );
}

export default ProductList;