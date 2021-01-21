import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneSquareAlt} from "@fortawesome/free-solid-svg-icons";
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        textAlign: 'left',
        color: 'white'
    },
    stats: {
        display: 'flex',
        flexDirection: 'row'
    },
    statColumn: {
        marginRight: 20,
    }
}))

export default function Shelter(props) {
    const shelter = props.shelter
    const classes = useStyles();

    const yesResponse = (
        <span style={{color: 'lightgreen'}}>
            Yes
        </span>
    )

    const noResponse = (
        <span style={{color: 'red'}}>
            No
        </span>
    )

    return (
        <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>{shelter.name}</div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{paddingRight: 20}}>{shelter.phone}</div>
                <a style={{color: "inherit"}} href={`tel:${shelter.phone}`}>
                    <FontAwesomeIcon icon={faPhoneSquareAlt} size={"2x"}/>
                </a>
            </div>
            <div>{shelter.address}</div>
            <Typography color={shelter.availableCapacity < 1 ? 'error' : 'primary'} variant={'h5'} component={'h5'}>Available beds: {shelter.availableCapacity}</Typography>
            <br/>
            <div className={classes.stats}>
                <div className={classes.statColumn}>
                    <div>
                        Allow Intox: {shelter.allowIntox ? yesResponse : noResponse}
                    </div>
                    <div>
                        Allow Narcotic: {shelter.allowNarcotic ? yesResponse : noResponse}
                    </div>
                </div>
                <div className={classes.statColumn}>
                    <div>
                        Allow Single Male: {shelter.singleMale ? yesResponse : noResponse}
                    </div>
                    <div>
                        Allow Family Male: {shelter.familyMale ? yesResponse : noResponse}
                    </div>
                    <div>
                        Allow Female: {shelter.female ? yesResponse : noResponse}
                    </div>
                    <div>
                        Allow Children: {shelter.children ? yesResponse : noResponse}
                    </div>
                </div>
            </div>
            <div style={{paddingTop: 10, paddingBottom: 10, width: '50%'}}>
                <hr/>
            </div>
        </div>
    )
}