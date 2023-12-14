import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { getAllLawyer, updateLawyer } from "../redux/action";
import { useSelector } from "react-redux";
import { Backdrop, Button, Dialog } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  StyledDiv,
  StyledTableCell,
  StyledTableRow,
  getItemStyle,
} from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DragAndDropList() {
  const dispatch = useDispatch();
  const [lawyerData, setLawyerData] = React.useState(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { lawyer, isLoading } = useSelector((state) => state.appReducer);
  const [questions, setQuestions] = useState(lawyer);

  // onDragEnd function used for drag and drop feature
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let movedItems = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(movedItems);
  };

  // getting the lawyer data from backend
  useEffect(() => {
    if (lawyer.length === 0) {
      dispatch(getAllLawyer());
    }
    setQuestions(lawyer);
  }, [lawyer.length, dispatch]);

  useEffect(() => {
    setQuestions(lawyer);
  }, [lawyer]);

  // handleBook function used to book the appointment
  const handleBook = (data) => {
    setLawyerData(data);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper} sx={{ maxHeight: "85vh" }}>
        <Table
          sx={{ minWidth: 700 }}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Speciality</StyledTableCell>
              <StyledTableCell>Firms</StyledTableCell>
              <StyledTableCell>Availablity</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {questions?.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={"q-" + item._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <StyledTableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{item.phone}</StyledTableCell>
                          <StyledTableCell>{item.speciality}</StyledTableCell>
                          <StyledTableCell>{item.firms}</StyledTableCell>
                          <StyledTableCell>
                            {item.availableTime}
                          </StyledTableCell>
                          <StyledTableCell>{item.address}</StyledTableCell>

                          <StyledTableCell>
                            <Button
                              variant="contained"
                              color="warning"
                              size="small"
                              disabled={!item.isAvailable}
                              onClick={() => handleBook(item)}
                            >
                              {item.isAvailable
                                ? "Book Appointment"
                                : "No Slot Available"}
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
      {isDialogOpen && (
        <AppointmentDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          lawyerData={lawyerData}
        />
      )}
    </>
  );
}

/**
 *
 * @param {*} props
 * @description AppointmentDialog function is used to confirm the appointment.
 * @returns successfully booked appointment
 */
const AppointmentDialog = (props) => {
  const dispatch = useDispatch();
  const { isDialogOpen, setIsDialogOpen, lawyerData } = props;

  const onSubmit = async () => {
    await dispatch(updateLawyer(lawyerData?._id, { isAvailable: false }));
    await dispatch(getAllLawyer());
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} TransitionComponent={Transition}>
      <StyledDiv style={{ height: "30vh" }}>
        <DialogTitle id="alert-dialog-title">
          <Grid container direction={"row"} alignItems={"center"}>
            <Grid item xs={11}>
              <div>{"Book Appointment"}</div>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Close">
                <IconButton
                  aria-label="cancel"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <ClearIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider light />
        <DialogContent id="alert-dialog-content">
          <Grid container spacing={2} textAlign={"center"}>
            <Grid item xs={12} sm="12">
              <Typography>Confirm your Appointment</Typography>
            </Grid>
            <Grid item xs={12} sm="12">
              <Typography>
                Your Appointment time slot is <b>{lawyerData?.availableTime}</b>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Confirm
          </Button>
        </DialogActions>
      </StyledDiv>
    </Dialog>
  );
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export default DragAndDropList;
