import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const PersonsTable = (props) => {
  let data = props.data.persons;

  return (
    <div>
      <br />
      <TableContainer component={Paper}>
        <IconButton aria-label="add new person"  onClick={() => props.createNewPerson()}>
          <PersonAddIcon fontSize="large" />
        </IconButton>

        <Table
          size="small"
          aria-labelledby="tableTitle"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Age</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Phone</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((person) => (
              <TableRow key={person._id}>
                <TableCell component="th" scope="row">
                  {person.name + " " + person.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {person.age}
                </TableCell>
                <TableCell align="left">
                  {person.phone === 0 || person.phone === null
                    ? "---"
                    : person.phone}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="delete"
                    onClick={() => props.deleteUser(person._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => props.editPerson(person._id, person)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PersonsTable;
