import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { editAlbumStartAsync } from '../redux/albums-redux/albums.actions';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '150px',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  edit: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
}));

function EditModal({ album, editAlbumStartAsync }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(album.title);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { ...album, title: newTitle };
    editAlbumStartAsync(data);
    handleClose();
  };

  return (
    <div>
      <Fab color={'promary'} aria-label={'edit'}>
        <Edit variant={'outlined'} color={'primary'} onClick={handleOpen} />
      </Fab>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
            <Typography variant={'h5'} component={'h6'}>
              Edit
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={'Title'}
                name={'title'}
                value={newTitle}
                onChange={handleChange}
                fullWidth
              />
              <Button
                onClick={handlePost}
                variant={'contained'}
                color={'secondary'}
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  editAlbumStartAsync: (data) => dispatch(editAlbumStartAsync(data)),
});

export default connect(null, mapDispatchToProps)(EditModal);
