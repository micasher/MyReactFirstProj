import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const CRMPage = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    axios
      .get("users/getAllUsers")
      .then(({ data: { users } }) => {
        setUsers(users);
      })
      .catch((error) => {});
  }, []);

  const handleDeleteUser = (userId) => {
    axios.delete(`users/deleteUser/` + userId).then(() => {
      setUsers(users.filter((user) => user._id !== userId));
    });
  };

  const handleEditUser = async (ev) => {
    try {
      let newUsersArr = JSON.parse(JSON.stringify(users));
      let currentUser = newUsersArr.find((user) => user._id == ev.target.id);
      await axios.put("/users/userInfo/" + currentUser._id, {
        firstName: currentUser.firstName,
        middleName: currentUser.middleName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
        imageAlt: currentUser.imageAlt,
        state: currentUser.state,
        country: currentUser.country,
        city: currentUser.city,
        street: currentUser.street,
        houseNumber: currentUser.houseNumber,
        zipCode: currentUser.zipCode,
        biz: !currentUser.biz,
      });
      currentUser.biz = !currentUser.biz;
      newUsersArr.map((user) => {
        if (user._id == currentUser._id) {
          user = { ...currentUser };
        }
      });
      setUsers(newUsersArr);
    } catch (err) {
      toast.error("ERR: something went wrong.");
      console.log(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Businness</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length ? (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell> {user.biz ? "business" : "not business"}</TableCell>
                <TableCell>
                  <Button
                    id={user._id}
                    variant="contained"
                    color="primary"
                    onClick={handleEditUser}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CRMPage;
