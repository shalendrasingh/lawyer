import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha("#fff", 0.15),
  width: "30%",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.25),
  },
}));

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

export { StyledTableCell, StyledDiv, StyledTableRow, getItemStyle, SearchBox };
