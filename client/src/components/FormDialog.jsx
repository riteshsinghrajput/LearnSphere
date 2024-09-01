import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { addClassNotice } from "../Redux/slices/courseSlice";

export default function FormDialog({ noticeData, state }) {
  const [open, setOpen] = React.useState(false);

  const [notice, setNotice] = React.useState({
    timeTable: noticeData?.timeTable ?noticeData?.timeTable : "" ,
    message: noticeData?.message ? noticeData?.message : "",
    id: state._id,
  });

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formDataChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };
  const classNoticeHandler = async (e) => {
    e.preventDefault();
    if (!notice.message && !notice.timeTable) {
      toast.error("Enter atleast one field");
      return;
    }

    const res = await dispatch(addClassNotice(notice));
    if (res.payload.success) {
        toast("please go back to see changes", {
            icon: "ℹ️",
          });
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Class Notice
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Class Notice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add class Notice to this coruse, please enter your below details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="timeTable"
            name="timeTable"
            label="Time Table"
            type="text"
            fullWidth
            variant="standard"
            value={notice.timeTable}
            onChange={(e) => formDataChange(e)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="message"
            name="message"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={notice.message}
            onChange={(e) => formDataChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(e) => classNoticeHandler(e)}>
            Add Class Notice
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
