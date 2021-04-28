import React from 'react';
import {Typography, makeStyles} from "@material-ui/core";
import {Card} from "@material-ui/core";
import {Phone} from "@material-ui/icons";
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'left',
    maxWidth: 600,
    width: '100%',
    minWidth: 300,
    flexDirection: 'row',
    margin: '20px auto',
    marginBottom: 20,
    padding: 20
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15
  },
  statColumn: {
    marginRight: 50,
  },
  phone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    marginTop: 15
  }
}))

export default function Shelter(props) {
  const shelter = props.shelter
  const distance = props.distance
  const classes = useStyles();

  const {
    allowsChildren,
    allowsFamilyFemale,
    allowsFamilyMale,
    allowsIntoxication,
    allowsNarcotics,
    allowsSingleFemale,
    allowsSingleMale,
    location,
    name,
    phone,
 } = shelter;

  const imageUrl = `${process.env.PUBLIC_URL}/${shelter.name.replace(/ /g, '')}.jpg`

  const listOfRequirements = [
    {
      allowed: allowsChildren,
      fieldName: 'Children'
    },
    {
      allowed: allowsFamilyFemale,
      fieldName: 'Family Female'
    },
    {
      allowed: allowsFamilyMale,
      fieldName: 'Family Male'
    },
    {
      allowed: allowsIntoxication,
      fieldName: 'Intoxicated'
    },
    {
      allowed: allowsNarcotics,
      fieldName: 'Narcotics'
    },
    {
      allowed: allowsSingleFemale,
      fieldName: 'Single Female'
    },
    {
      allowed: allowsSingleMale,
      fieldName: 'Single Male'
    }
  ];

  const acceptsList = listOfRequirements.filter(item => item.allowed === true);
  const notAcceptedList = listOfRequirements.filter(item => item.allowed === false);

  return (
    <Card className={classes.card}>
      <div id={'infoColumn'} style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: 3}}>
            <Typography variant={'h5'}>{name}</Typography>
            <a href={`http://maps.google.com/?q=${location}`} style={{color: 'lightblue'}}>{location}</a>
            {!!distance ? <div>Distance: {distance} miles</div> : ""}
            <div className={classes.phone}>
              <a href={'tel:' + phone} style={{color: 'white', padding: 4}}><Phone/></a>
              <Typography style={{paddingRight: 20}} variant='h6'>{phone}</Typography>
            </div>

            <Button variant='outlined' style={{marginTop: 10}}>Website</Button>
            <Button
              variant='outlined'
              style={{marginTop: 10, marginLeft: 10}}
              href={`http://maps.google.com/?q=${location}`}
              >
                Directions
            </Button>
          </div>
        </div>

        <div className={classes.stats}>
          <div className={classes.statColumn}>
            <span style={{fontSize: 16, fontWeight: 'bold'}}>Accepts:</span>
            {acceptsList?.map(item => <div key={item.fieldName}>{item.fieldName}</div>)}
          </div>

          <div className={classes.statColumn}>
            <span style={{fontSize: 16, fontWeight: 'bold'}}>Not Accepted:</span>
            {notAcceptedList?.map(item => <div key={item.fieldName}>{item.fieldName}</div>)}
          </div>
        </div>
      </div>
      <div id={'imageColumn'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={imageUrl} style={{width: '100%'}} />
      </div>
    </Card>
  )
}
