import React, {useEffect, useState} from 'react'
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneSquareAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar, faBars} from '@fortawesome/free-solid-svg-icons'
import {Toolbar, AppBar, Typography, makeStyles, IconButton} from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles(() => ({
    appBar: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        marginBottom: 50
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
    warningText: {
        fontSize: "calc(10px + 1vmin)",
        width: '80%'
    },
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

function App() {
    const classes = useStyles();

    const [shelters, setShelters] = useState([])

    useEffect(() => {
        axios.get('https://codefornebraska-housing.herokuapp.com/shelters')
            .then(res => {
                console.log(res.data)
                setShelters(res.data)
            })
    }, [])

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
        <div className="App">
            <header className="App-header">
                <div style={{marginBottom: 75}}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton>
                                <FontAwesomeIcon icon={faBars} size={'xs'} color={'white'}/>
                            </IconButton>
                            <Typography component={'h5'} variant={'h5'}>Metro Shelter Project</Typography><Typography style={{backgroundColor: 'yellow', color: 'black'}}>Not ready for public release</Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Typography className={classes.warningText} color={'error'} gutterBottom>Individuals involved in Domestic Violence Situations may have
                further resources available that are not listed below. Please contact your emergency services number for
                assistance</Typography>
                {shelters.map(shelter => {
                    return (
                        <div
                            className={classes.card}
                            key={shelter.id}
                        >
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
                })}
            </header>
        </div>
    );
}

export default App;
