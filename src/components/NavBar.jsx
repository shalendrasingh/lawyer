import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { getAllLawyer, getSearch } from "../redux/action";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { SearchBox } from "./style";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const NavBar = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = React.useState("");
  const debouncedSearch = React.useCallback(
    debounce(async (text) => {
      if (text !== "") {
        await dispatch(getSearch(text));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = () => {
    if (searchText !== "") {
      debouncedSearch(searchText);
    }
  };
  const handleClear = async () => {
    setSearchText("");
    await dispatch(getAllLawyer());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Lawyer
          </Typography>
          <SearchBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                debouncedSearch(e.target.value);
              }}
            />
          </SearchBox>
          <Button variant="contained" color="warning" onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClear}
            sx={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
