import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { addUserStart } from "../../../redux/users/users.actions";
import { connect } from "react-redux";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "350px",
    width: "320px",
  },
  add: {
    height: "50px",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    zIndex: "1000",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AddItemModal({ addUserStart }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    username: "",
    name: "",
    phone: "",
    website: "",
  });
  // const [company, setCompany] = useState({
  //   name: "",
  //   catchPhrase: "",
  //   bs: "",
  // });
  // const [geo, setGeo] = useState({
  //   lat: "",
  //   lng: "",
  // });
  // const [address, setAddress] = useState({
  //   street: "",
  //   suite: "",
  //   city: "",
  //   zipcode: "",
  // });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetails = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };
  // const handleCompany = (event) => {
  //   setCompany({ ...company, [event.target.name]: event.target.value });
  // };
  // const handleGeo = (event) => {
  //   setGeo({ ...geo, [event.target.name]: event.target.value });
  // };
  // const handleAddress = (event) => {
  //   setAddress({ ...address, [event.target.name]: event.target.value });
  // };

  const handlePost = (event) => {
    event.preventDefault();
    const data = {
      ...details,
      // address: { ...address },
      // geo: { ...geo },
      // company: { ...company },
    };
    addUserStart(data);
    handleClose();
    // setAddress({
    //   street: "",
    //   suite: "",
    //   city: "",
    //   zipcode: "",
    // });
    // setGeo({ lat: "", lng: "" });
    // setCompany({ name: "", catchPhrase: "", bs: "" });
    setDetails({
      email: "",
      username: "",
      name: "",
      phone: "",
      website: "",
    });
  };

  return (
    <div>
      <Button
        id="addNewUsers"
        onClick={handleOpen}
        variant={"contained"}
        color={"secondary"}
        className={classes.add}
      >
        Add <Add color={"primary"} fontSize={"small"} />
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant={"h5"} component={"h6"}>
              Add New User
            </Typography>
            <form onSubmit={handlePost}>
              <Typography variant={"h6"} component={"h6"}>
                Details
              </Typography>
              <TextField
                label={"Name"}
                name={"name"}
                value={details.name}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"E-mail"}
                name={"email"}
                value={details.email}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Username"}
                name={"username"}
                value={details.username}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Phone"}
                name={"phone"}
                value={details.phone}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Website"}
                name={"website"}
                value={details.website}
                onChange={handleDetails}
                fullWidth
              />
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Company*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"Name"}*/}
              {/*  name={"name"}*/}
              {/*  value={company.name}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Catch Phrase"}*/}
              {/*  name={"catchPhrase"}*/}
              {/*  value={company.catchPhrase}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"BS"}*/}
              {/*  name={"bs"}*/}
              {/*  value={company.bs}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Address*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"City"}*/}
              {/*  name={"city"}*/}
              {/*  value={address.city}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Street"}*/}
              {/*  name={"street"}*/}
              {/*  value={address.street}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Suite"}*/}
              {/*  name={"suite"}*/}
              {/*  value={address.suite}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Zip Code"}*/}
              {/*  name={"zipcode"}*/}
              {/*  value={address.zipcode}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Geo*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"Latitude"}*/}
              {/*  name={"lat"}*/}
              {/*  value={geo.lat}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label={"Latitude"}*/}
              {/*    name={"lat"}*/}
              {/*    value={geo.lat}*/}
              {/*    onChange={handleAddress}*/}
              {/*    fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label={"Latitude"}*/}
              {/*    name={"lng"}*/}
              {/*    value={geo.lng}*/}
              {/*    onChange={handleAddress}*/}
              {/*    fullWidth*/}
              {/*/>*/}

              <Button
                onClick={handlePost}
                variant={"contained"}
                color={"secondary"}
                className={classes.button}
              >
                Create
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addUserStart: (data) => dispatch(addUserStart(data)),
});

export default connect(null, mapDispatchToProps)(AddItemModal);
