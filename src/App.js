import React, {useEffect, useState} from 'react';
import {Typography, makeStyles} from "@material-ui/core";
import {ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";

import Shelter from "./components/Shelter";
import Header from "./components/Header";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#303030'
  },
  appHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },

}))

const GET_SHELTERS = gql`
    {
        shelter {
            id
            name
            time
            location
            allowsFemale
        }
    }
`;

function App() {
  const classes = useStyles();

  const {data} = useQuery(GET_SHELTERS);
  const shelters = data && data.shelter || [];
  console.log(JSON.stringify(shelters))
  return (
    <div>
      <header className="App-header">

        <Header/>

        <Typography className={classes.warningText} color={'error'} gutterBottom>Individuals involved in
          Domestic Violence Situations may have
          further resources available that are not listed below. Please contact your emergency services number
          for
          assistance</Typography>

        {shelters.map(shelter => {
          return (<Shelter
            shelter={shelter}
            key={shelter.id}
          />)
        })}
      </header>
    </div>
  );
}

export default App;
