import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Home from "@material-ui/icons/Home";
import Menu from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemLink from "../../components/link";
import Button from "@material-ui/core/Button";
import {
  AllInbox,
  Comment,
  People,
  Photo,
  PhotoLibrary,
  PlaylistAddCheck,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  buttonLinks: {
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));
const Links = [
  { primary: "TestRedux", to: "/", icon: <Home /> },
  { primary: "Albums", to: "/albums", icon: <PhotoLibrary /> },
  { primary: "Comments", to: "/comments", icon: <Comment /> },
  { primary: "Photos", to: "/photos", icon: <Photo /> },
  { primary: "Posts", to: "/posts", icon: <AllInbox /> },
  { primary: "Todos", to: "/todos", icon: <PlaylistAddCheck /> },
  { primary: "Users", to: "/users", icon: <People /> },
];

export default function SideBarShared() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Links.map((link) => (
          <div key={link.to}>
            <ListItemLink
              to={link.to}
              primary={link.primary}
              icon={link.icon}
            />
            <Divider />
          </div>
        ))}
      </List>
      <List>
        <div className={classes.links}>
          <Button
            variant={"contained"}
            color={"primary"}
            component={"a"}
            href={"https://github.com/igmrrf/react-redux-jsonplaceholder"}
            className={classes.buttonLinks}
          >
            Github
          </Button>
        </div>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          onClick={toggleDrawer("left", true)}
          edge={false}
          color={"inherit"}
          aria-label={"menu"}
        >
          <Menu />
        </IconButton>

        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
