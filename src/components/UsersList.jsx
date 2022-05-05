import axios from "axios";
import React from "react";
import { useInfiniteQuery } from "react-query";

const fetchUsers = ({ pageParam = 1 }) =>
  axios.get(`https://reqres.in/api/users?page=${pageParam}`);

const UsersList = () => {
  const { data, error, isError, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["users"], fetchUsers, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < 2) {
          return pages.length + 1;
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
        {data?.pages.map((group, i) => {
          return (
            <div key={i}>
              {group.data.data.map((user) => (
                <h1 key={user.id}>{user.first_name}</h1>
              ))}
            </div>
          );
        })}
      </div>
      <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Load More
      </button>
    </>
  );
};

export default UsersList;
