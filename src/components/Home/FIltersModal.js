import React, { useState } from "react";
import { connect } from "react-redux";

import { Button, Modal } from "semantic-ui-react";
import { makeStyles } from "@mui/styles";

import Filters from "../Filters";

const useStyles = makeStyles(() => ({
  filterBtn: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    zIndex: 1,
    boxShadow:
      "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%) !important",
  },
  modal: {
    maxWidth: 440,
    marginTop: '80px !important'
  },
}));

const FIltersModal = (props) => {
  const { loading } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Modal
      closeIcon
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          circular
          color="blue"
          icon="filter"
          className={classes.filterBtn}
          size="huge"
          disabled={loading}
        />
      }
      className={classes.modal}
    >
      <Modal.Header>Filters</Modal.Header>
      <Modal.Content scrolling>
        <Filters />
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.productsReducer.loading,
  };
};

export default connect(mapStateToProps)(FIltersModal);