import React, {useEffect, useState} from 'react'
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneSquareAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {Toolbar, AppBar, Typography, makeStyles} from "@material-ui/core";


const staticShelters = [
    {
        id: 1,
        name: 'Stephen Center',
        rating: '4.3',
        address: '2723 Q St, Omaha, NE 68107',
        phone: '(402) 731-0238',
        allowIntox: false,
        allowNarcotic: true,
        singleMale: true,
        familyMale: true,
        female: true,
        children: true,
        active: true,
        currentCapacity: 23
    },
    {
        id: 2,
        name: 'Sienna Francis House',
        rating: '3.5',
        address: '1702 Nicholas St, Omaha, NE 68102',
        phone: '(402) 341-1821',
        allowIntox: true,
        allowNarcotic: false,
        singleMale: true,
        familyMale: true,
        female: true,
        children: false,
        active: true,
        currentCapacity: 11
    },
    {
        id: 3,
        name: 'Open Door Mission / Lydia House / Garland Thompson Men\'s Center',
        rating: '3.8',
        address: '2809 N 20th St E, Omaha, NE 68110',
        phone: '(402) 829-1531',
        allowIntox: false,
        allowNarcotic: true,
        singleMale: true,
        familyMale: true,
        female: true,
        children: true,
        active: true,
        currentCapacity: 0
    },
    {
        id: 5,
        name: "Micah House",
        rating: '3.9',
        address: "1415 Avenue J, Council Bluffs, IA 51501",
        phone: "(712) 323-4416",
        allowIntox: false,
        allowNarcotic: true,
        singleMale: false,
        familyMale: true,
        female: true,
        children: true,
        active: true,
        currentCapacity: 5
    },
    {
        id: 6,
        name: "Joshua House",
        rating: '4.0',
        address: "1435 N. 15th St, Council Bluffs, IA 51501",
        phone: '(712) 322-7570',
        allowIntox: true,
        allowNarcotic: false,
        singleMale: true,
        familyMale: false,
        female: false,
        children: false,
        active: true,
        currentCapacity: 3
    }
]

const useStyles = makeStyles(() => ({
    appBar: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row"
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
    const [allowIntox, setAllowIntox] = useState(true)
    const [allowNarcotic, setAllowNarcotic] = useState(true)
    const [male, setMale] = useState(true)
    const [female, setFemale] = useState(true)
    const [family, setFamily] = useState(true)

    useEffect(() => {
        console.log(staticShelters);
        setShelters(staticShelters)
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
                <Toolbar className={classes.appBar}>
                    <AppBar>
                        <Typography component={'h5'} variant={'h5'}>Metro Shelter Project</Typography>
                    </AppBar>
                </Toolbar>
                <Typography className={classes.warningText} color={'error'} gutterBottom>Individuals involved in Domestic Violence Situations may have
                further resources available that are not listed below. Please contact your emergency services number for
                assistance</Typography>
                {shelters.map(shelter => {
                    return (
                        <div
                            className={classes.card}
                            key={shelter.id}
                        >
                            <div style={{display: 'flex', alignItems: 'center'}}>{shelter.name}: {shelter.rating}<FontAwesomeIcon icon={faStar} size={"xs"}/></div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{paddingRight: 20}}>{shelter.phone}</div>
                                <a style={{color: "inherit"}} href={`tel:${shelter.phone}`}>
                                    <FontAwesomeIcon icon={faPhoneSquareAlt} size={"2x"}/>
                                </a>
                            </div>
                            <div>{shelter.address}</div>
                            <Typography color={shelter.currentCapacity < 1 ? 'error' : 'primary'} variant={'h5'} component={'h5'}>Available beds: {shelter.currentCapacity}</Typography>
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
