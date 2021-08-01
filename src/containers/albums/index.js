import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  fetchAlbumsStart,
  deleteAlbumStart,
} from "../../redux/albums/albums.actions";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import EditModal from "./components/edit-modal";
import AddItemModal from "./components/add-modal";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import blue from "@material-ui/core/colors/blue";
import SkeletonComponent from "../components/skeleton.component";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";
import {
  selectAlbumsFetchStatus,
  selectAlbumsData,
  selectAlbumsErrorMessage,
} from "../../redux/albums/albums.selectors";
import { createStructuredSelector } from "reselect";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  AlbumImage: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  modalBox: {
    display: "flex",
    justifyContent: "space-between",
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

const AlbumContainer = ({
  fetchAlbumsStart,
  deleteAlbumStart,
  albums,
  errorMessage,
  isFetching,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageAlbums, setPageAlbums] = useState([]);
  const classes = useStyles();
  const count = Math.ceil(albums.length / 10);

  useEffect(() => {
    if (albums.length < 1) fetchAlbumsStart();
  }, [fetchAlbumsStart, albums]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageAlbums(albums.slice(minimum, maximum));
  }, [page, isFetching, albums, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };
  if (errorMessage === "Network Error") return <Redirect to="/" />;
  else
    return (
      <Box className={classes.root}>
        <Typography variant={"h2"} id="headerPageText" component={"h1"}>
          Albums <strong className={classes.length}> [{albums.length}]</strong>
          <AddItemModal />
        </Typography>

        <Grid container justify={"center"} alignItems={"center"} spacing={4}>
          {pageAlbums.length > 1 ? (
            pageAlbums.map((each) => (
              <Grid item xs={10} sm={5} md={3} key={each.id}>
                <Paper className={`${classes.card} card`} elevation={10}>
                  {each.id}

                  <Typography>{each.title}</Typography>
                  <Box style={{ height: "200px" }}>
                    <img
                      loading={"eager"}
                      src={`https://picsum.photos/seed/${each.id}/200`}
                      alt={""}
                    />
                  </Box>

                  <Box className={classes.modalBox}>
                    <EditModal key={each.id} album={each} />
                    <Fab color={"primary"} aria-label={"delete"}>
                      <DeleteForeverRounded
                        id={`itemDeleteAlbum${each.id}`}
                        onClick={() => deleteAlbumStart(each.id)}
                      />
                    </Fab>
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
  fetchAlbumsStart: () => dispatch(fetchAlbumsStart()),
  deleteAlbumStart: (id) => dispatch(deleteAlbumStart(id)),
});

const mapStateToProps = createStructuredSelector({
  albums: selectAlbumsData,
  isFetching: selectAlbumsFetchStatus,
  errorMessage: selectAlbumsErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
