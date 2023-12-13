import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { InputBase } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "@emotion/styled";
import {
  addLawyer,
  getAllLawyer,
  getSearch,
  updateLawyer,
} from "../redux/action";
import { useSelector } from "react-redux";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Dialog } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {},
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDiv = styled("div")(({ theme }) => ({
  width: "500px",
  padding: 10,
  borderRadius: 5,
  "& small": {
    color: "#C4C5C766",
  },
  "& .error-message": {
    fontSize: 12,
    color: "red",
  },
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "#757ce8" : "white",
  ...draggableStyle,
});

function DragAndDropList() {
  const dispatch = useDispatch();
  const [lawyerData, setLawyerData] = React.useState(null);
  const [isViewPatOpen, setIsViewPatOpen] = React.useState(false);
  const { lawyer } = useSelector((state) => state.appReducer);
  const [questions, setQuestions] = useState(lawyer);
  const [searchText, setSearchText] = useState("");

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

  useEffect(() => {
    if (lawyer.length === 0) {
      dispatch(getAllLawyer());
    }
    setQuestions(lawyer);
  }, [lawyer.length, dispatch]);

  useEffect(() => {
    setQuestions(lawyer);
  }, [lawyer]);

  const handleBook = (data) => {
    setLawyerData(data);
    setIsViewPatOpen(true);
  };

  const handleSearch = async () => {
    if (searchText !== "") {
      await dispatch(getSearch(searchText));
    }
  };
  const handleClear = async () => {
    setSearchText("");
    await dispatch(getAllLawyer());
  };
  return (
    <>
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
      {isViewPatOpen && (
        <ViewPatient
          isViewPatOpen={isViewPatOpen}
          setIsViewPatOpen={setIsViewPatOpen}
          lawyerData={lawyerData}
        />
      )}
    </>
  );
}

const ViewPatient = (props) => {
  const dispatch = useDispatch();
  const { isViewPatOpen, setIsViewPatOpen, lawyerData } = props;

  const onSubmit = async () => {
    await dispatch(updateLawyer(lawyerData?._id, { isAvailable: false }));
    await dispatch(getAllLawyer());
    setIsViewPatOpen(false);
  };
  return (
    <Dialog open={isViewPatOpen} TransitionComponent={Transition}>
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
                  onClick={() => setIsViewPatOpen(false)}
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
            onClick={() => setIsViewPatOpen(false)}
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

export default DragAndDropList;
