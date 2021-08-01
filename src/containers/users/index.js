import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  fetchUsersStart,
  deleteUserStart,
} from "../../redux/users/users.actions";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TransitionsModal from "./components/edit-modal";
import AddItemModal from "./components/add-modal";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import blue from "@material-ui/core/colors/blue";
import SkeletonComponent from "../components/skeleton.component";
import { useSnackbar } from "notistack";
import { createStructuredSelector } from "reselect";
import {
  selectUsersData,
  selectUsersErrorMessage,
  selectUsersFetchStatus,
} from "../../redux/users/users.selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  userImage: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "10px",
    left: "10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  length: {
    fontSize: "16px",
    color: blue,
  },
}));

const UserContainer = ({
  fetchUsersStart,
  deleteUserStart,
  users,
  isFetching,
  errorMessage,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageUsers, setPageUsers] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(users.length / 10);

  useEffect(() => {
    if (users.length < 1) fetchUsersStart();
  }, [fetchUsersStart, users]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageUsers(users.slice(minimum, maximum));
  }, [page, isFetching, users, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Users <strong className={classes.length}> [{users.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pageUsers.length > 1 ? (
          pageUsers.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={`${classes.card} card`} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  id={`itemDeleteUsers${each.id}`}
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => deleteUserStart(each.id)}
                />

                <Typography>{each.name}</Typography>
                <Typography> {each.username}</Typography>
                <Typography>{each.email}</Typography>
                <Typography>{each.phone}</Typography>
                <Typography>{each.website}</Typography>

                <Box>
                  <TransitionsModal key={each.id} user={each} />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <SkeletonComponent />
        )}
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        className={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsersStart: () => dispatch(fetchUsersStart()),
  deleteUserStart: (id) => dispatch(deleteUserStart(id)),
});

const mapStateToProps = createStructuredSelector({
  users: selectUsersData,
  isFetching: selectUsersFetchStatus,
  errorMessage: selectUsersErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
