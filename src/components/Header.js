import React from 'react';
import {AppBar, IconButton, Toolbar, Typography, makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(() => ({
    warningText: {
        fontSize: "calc(10px + 1vmin)",
        width: '80%'
    },
    appBar: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        marginBottom: 50
    },

}))

export default function Header(props) {
    const classes = useStyles();

    return (
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
    )
}