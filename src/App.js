import React, {useEffect, useState} from 'react'
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhoneSquareAlt} from '@fortawesome/free-solid-svg-icons'

const staticShelters = [
    {
        name: 'Stephen Center',
        rating: '4.3',
        address: '2723 Q St, Omaha, NE 68107',
        phone: '(402) 731-0238'
    },
    {
        name: 'Siena Francis House',
        rating: '3.5',
        address: '1702 Nicholas St, Omaha, NE 68102',
        phone: '(402) 341-1821'
    },
    {
        name: 'Open Door Mission Lydia House',
        rating: '3.8',
        address: '2809 N 20th St E, Omaha, NE 68110',
        phone: '(402) 829-1531'
    }, {
        name: "Garland Thompson Men's Center",
        rating: '4.2',
        address: '2705 N 20th St E, Omaha, NE 68110',
        phone: '(402) 829-1531'
    }, {
        name: "Micah House",
        rating: '3.9',
        address: "1415 Avenue J, Council Bluffs, IA 51501",
        phone: "(712) 323-4416"
    }, {
        name: "Open Door Mission",
        rating: "4.3",
        address: "2828 N 23rd St E, Omaha, NE 68110",
        phone: "(402) 422-1111"
    }
]

function App() {

    const [shelters, setShelters] = useState([])

    useEffect(() => {
        setShelters(staticShelters)
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                {[shelters.map(shelter => {
                    return (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '90%',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            textAlign: 'left',
                        }}>
                            <div>{shelter.name}: {shelter.rating}</div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{paddingRight: 20}}>{shelter.phone}</div>
                                <a style={{color: "inherit"}} href={`tel:${shelter.phone}`}>
                                    <FontAwesomeIcon icon={faPhoneSquareAlt} size={"2x"}/>
                                </a>
                            </div>
                            <div>{shelter.address}</div>
                            <div style={{paddingTop: 10, paddingBottom: 10, width: '50%'}}>
                                <hr/>
                            </div>
                        </div>
                    )
                })]}
            </header>
        </div>
    );
}

export default App;
