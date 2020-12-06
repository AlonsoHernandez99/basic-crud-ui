import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { Col, Row } from "styled-bootstrap-grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PersonForm = (props) => {
  const classes = useStyles();

  const initPerson = {
    _id: "",
    name: "",
    surname: "",
    age: 0,
    phone: 0,
    address: "",
    email: "",
  };

  const [person, setPerson] = useState(initPerson);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange(e, props.addPerson(person));
    setPerson({
      _id: "",
      name: "",
      surname: "",
      age: 0,
      phone: 0,
      address: "",
      email: "",
    });
  };

  return (
    <ValidatorForm
      className={classes.root}
      onSubmit={handleSubmit}
      onError={(errors) => console.log(errors)}
    >
      <h2>New Person:</h2>
      <br />
      <Row className="max-width">
        <Col col xl="12" lg="12" md="12" sm="12">
          <TextValidator
            name="name"
            label="Name"
            value={person.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth={true}
            validators={["required"]}
            errorMessages={["Name field is required"]}
          />
        </Col>
        <Col className="margin-top" col xl="12" lg="12" md="12" sm="12">
          <TextValidator
            name="surname"
            label="Surname"
            value={person.surname}
            onChange={handleChange}
            variant="outlined"
            fullWidth={true}
            validators={["required"]}
            errorMessages={["Surname field is required"]}
          />
        </Col>
        <Col className="margin-top" col xl="12" lg="12" md="12" sm="12">
          <TextValidator
            label="Age"
            type="number"
            name="age"
            value={person.age}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth={true}
            validators={["required"]}
            InputProps={{
              inputProps: {
                max: 100,
                min: 1,
              },
            }}
            errorMessages={["Age field is required"]}
          />
        </Col>
        <Col className="margin-top" col xl="12" lg="12" md="12" sm="12">
          <TextValidator
            label="Phone Number"
            type="number"
            name="phone"
            value={person.phone}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth={true}
          />
        </Col>
        <Col className="margin-top" col xl="12" lg="12" md="12" sm="12">
          <TextValidator
            label="Email"
            type="email"
            name="email"
            value={person.email}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth={true}
            validators={["isEmail"]}
            errorMessages={["email is not valid"]}
          />
        </Col>
        <Col className="margin-top" col xl="12" lg="12" md="12" sm="12">
          <TextField
            name="address"
            label="Address"
            multiline
            value={person.address}
            onChange={handleChange}
            rows={2}
            variant="outlined"
            fullWidth={true}
          />
        </Col>
        <Col col xl="12" lg="12" md="12" sm="12">
          <br />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            startIcon={<SaveIcon />}
          >
            {"Save"}
          </Button>
        </Col>
      </Row>
    </ValidatorForm>
  );
};

export default PersonForm;
