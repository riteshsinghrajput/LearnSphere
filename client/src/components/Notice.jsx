import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useSelector } from "react-redux";

import FormDialog from "./FormDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notice({ noticeData, state }) {
  const [open, setOpen] = React.useState(false);

  const { data } = useSelector((state) => state?.auth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ border: "1px solid rgb(168 85 247)", color: "black" }}
      >
        Class Notice board
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "rgb(168 85 247)" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Notice board
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText
              primary="Time Table"
              secondary={noticeData?.timeTable}
            />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText primary="message" secondary={noticeData?.message} />
          </ListItemButton>
        </List>
        {((data?.role === "INST" && data?._id === state?.createdBy.id) ||
          data?.role === "ADMIN") && (
          <FormDialog noticeData={noticeData} state={state} />
        )}
      </Dialog>
    </React.Fragment>
  );
}
