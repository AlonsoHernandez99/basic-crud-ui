import { useEffect, useState } from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import PersonsTable from "./PersonsTable";
import PersonForm from "../forms/PersonForm";
import PersonFormUpdate from "../forms/PersonFormUpd";

const CREATE_PERSON = gql`
  mutation addPerson(
    $name: String
    $surname: String!
    $age: Int!
    $phone: Int!
    $email: String!
    $address: String!
  ) {
    addPerson(
      name: $name
      surname: $surname
      age: $age
      phone: $phone
      address: $address
      email: $email
    ) {
      _id
      name
      surname
      age
      phone
      address
      email
    }
  }
`;

const EDIT_PERSON = gql`
  mutation updatePerson(
    $_id: String
    $name: String
    $surname: String!
    $age: Int!
    $phone: Int!
    $email: String!
    $address: String!
  ) {
    updatePerson(
      id: $_id
      name: $name
      surname: $surname
      age: $age
      phone: $phone
      address: $address
      email: $email
    ) {
      _id
      name
      surname
      age
      phone
      address
      email
    }
  }
`;

const DELETE_PERSON = gql`
  mutation deletePerson($id: String) {
    deletePerson(id: $id) {
      _id
      name
      surname
      age
      phone
      address
      email
    }
  }
`;

const GET_ITEMS = gql`
  query {
    persons {
      _id
      name
      surname
      age
      phone
      address
      email
    }
  }
`;

export default function FormContainer() {
  const initPerson = {
    _id: "",
    name: "",
    surname: "",
    age: 0,
    phone: 0,
    address: "",
    email: "",
  };

  const [currentPerson, setCurrentPerson] = useState(initPerson);
  const [editing, setEditing] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ITEMS);
  const [savePerson, { person }] = useMutation(CREATE_PERSON);
  const [updPerson, { personUpd }] = useMutation(EDIT_PERSON);
  const [deletePerson] = useMutation(DELETE_PERSON);

  if (loading) return "Loading Persons...";
  if (error) return `Error! ${error.message}`;

  const addPerson = (person) => {
    if (person) {
      person.phone = Number(person.phone);
      person.age = Number(person.age);
      delete person._id;
      savePerson({
        variables: person,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: GET_ITEMS,
          });
          const new_person = result.data.addPerson;
          proxy.writeQuery({
            query: GET_ITEMS,
            data: { persons: [new_person, ...data.persons] },
          });
        },
      });
    }
  };

  const editPerson = (id, person) => {
    setEditing(true);
    setCurrentPerson(person);
  };

  const createNewPerson = () => {
    setEditing(false);
    setCurrentPerson(initPerson);
  };

  const updatePerson = (newPerson) => {
    if (newPerson) {
      newPerson.phone = Number(newPerson.phone);
      newPerson.age = Number(newPerson.age);
      updPerson({
        variables: newPerson,
      });
      setEditing(false);
      setCurrentPerson(initPerson);
    }
  };

  const deleteUser = (id) => {
    setEditing(false);
    setCurrentPerson(initPerson);
    deletePerson({
      variables: { id },
      update(proxy, result) {
        const data = proxy.readQuery({
          query: GET_ITEMS,
        });
        let newData = data.persons.filter((r) => r._id != id);
        proxy.writeQuery({
          query: GET_ITEMS,
          data: { persons: [...newData] },
        });
      },
    });
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          {editing ? (
            <PersonFormUpdate
              currentPerson={currentPerson}
              updatePerson={updatePerson}
            ></PersonFormUpdate>
          ) : (
            <PersonForm addPerson={addPerson}></PersonForm>
          )}
        </Grid>
        <Grid item xs={7}>
          <PersonsTable
            data={data}
            editPerson={editPerson}
            deleteUser={deleteUser}
            createNewPerson={createNewPerson}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
