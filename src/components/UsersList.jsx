import React, { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const fetchUsers = ({ pageParam = 1 }) =>
  axios.get(`https://reqres.in/api/users?page=${pageParam}`);

const UsersList = () => {
  const {
    data,
    error,
    isError,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery(["users"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 2) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (pages.length > 1) {
        return pages.length - 1;
      } else {
        return undefined;
      }
    },
  });

  if (isError) {
    return <h2>Ha ocurrido un error: {error}</h2>;
  }

  if (isLoading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => (
          <div key={i}>
            {group.data.data.map((user) => (
              <div
                style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}
                key={user.id}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={user.first_name} src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <hr></hr>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "0 auto",
          marginTop: "50px",
          width: "50%",
        }}
      >
        <Button
          disabled={!hasPreviousPage}
          onClick={() => fetchPreviousPage()}
          variant="contained"
          component="span"
          sx={{ width: "max-width" }}
        >
          1
        </Button>

        <Button
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
          variant="contained"
          component="span"
          sx={{ width: "min-width" }}
        >
          2
        </Button>
      </div>
    </>
  );
};

export default UsersList;
