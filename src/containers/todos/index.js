import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  fetchTodosStart,
  deleteTodoStart,
} from "../../redux/todos/todos.actions";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import TransitionsModal from "./components/edit-modal";
import AddItemModal from "./components/add-modal";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import blue from "@material-ui/core/colors/blue";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";
import SkeletonComponent from "../components/skeleton.component";
import { useSnackbar } from "notistack";
import { createStructuredSelector } from "reselect";
import {
  selectTodosData,
  selectTodosErrorMessage,
  selectTodosFetchStatus,
} from "../../redux/todos/todos.selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  todoImage: {
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

const TodoContainer = ({
  fetchTodosStart,
  deleteTodoStart,
  todos,
  isFetching,
  errorMessage,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageTodos, setPageTodos] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(todos.length / 10);

  useEffect(() => {
    if (todos.length < 1) fetchTodosStart();
  }, [fetchTodosStart, todos]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageTodos(todos.slice(minimum, maximum));
  }, [page, isFetching, todos, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Todos <strong className={classes.length}> [{todos.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pageTodos.length > 1 ? (
          pageTodos.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={`${classes.card} card`} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  id={`itemDeleteTodos${each.id}`}
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => deleteTodoStart(each.id)}
                />

                <Typography>{each.title}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckCircleOutline />}
                      checkedIcon={<CheckCircle />}
                      name="checkedH"
                      checked={each.completed}
                    />
                  }
                  label={each.completed ? "Completed" : "Uncompleted"}
                />

                <Box>
                  <TransitionsModal key={each.id} todo={each} />
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
  fetchTodosStart: () => dispatch(fetchTodosStart()),
  deleteTodoStart: (id) => dispatch(deleteTodoStart(id)),
});

const mapStateToProps = createStructuredSelector({
  todos: selectTodosData,
  isFetching: selectTodosFetchStatus,
  errorMessage: selectTodosErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
