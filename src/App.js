import React, {useState, useRef, useEffect} from 'react';
import {any, values} from 'ramda';
import {
  Typography,
  makeStyles,
  Popper,
  AppBar,
  Toolbar,
  IconButton,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {gql, useQuery} from "@apollo/client";
import Shelter from "./components/Shelter";
import {Menu} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  appHeader: {
    marginBottom: 75
  },
  cardGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  warningText: {
    fontSize: "calc(10px + 1vmin)",
    width: '80%',
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: '20px'
  },
  appBar: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    marginBottom: 50
  },

}))

const GET_SHELTERS = gql`
    {
        shelter {
            id
            name
            createdAt
            phone
            location
            availableCapacity
            totalCapacity
            allowsIntoxication
            allowsNarcotics
            allowsSingleMale
            allowsFamilyMale
            allowsFamilyFemale
            allowsSingleFemale
            allowsChildren
        }
    }
`;

function App() {
  const classes = useStyles();
  const {data} = useQuery(GET_SHELTERS);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState({
    isIntoxicated: false,
    isNarcotics: false,
    isSingleMale: false,
    isSingleFemale: false,
    isFamilyMale: false,
    isFamilyFemale: false,
    isChildren: false
  })
  const anchorRef = useRef(null);
  const shelters = data && data.shelter || []
    console.log(JSON.stringify(check))
  const filteredShelters = shelters.filter(shelter => {
    if (!any(value => value == true)(values(check))) {
      return true;
    }
    return (shelter.allowsIntoxication || shelter.allowsIntoxication === check.isIntoxicated) &&
      (shelter.allowsNarcotics || shelter.allowsNarcotics === check.isNarcotics) &&
      (shelter.allowsSingleMale || shelter.allowsSingleMale === check.isSingleMale) &&
      (shelter.allowsSingleFemale || shelter.allowsSingleFemale === check.isSingleFemale) &&
      (shelter.allowsFamilyMale || shelter.allowsFamilyMale === check.isFamilyMale) &&
      (shelter.allowsFamilyFemale || shelter.allowsFamilyFemale === check.isFamilyFemale) &&
      (shelter.allowsChildren || shelter.allowsChildren === check.isChildren)
  })

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleChange = (name) => (event) => {
    setCheck({...check, [name]: event.target.checked});
  };

  return (
    <div>
      <header className={classes.appHeader}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton>
              <Menu
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              />
            </IconButton>
            <Typography component={'h5'} variant={'h5'}>Metro Shelter Project</Typography><Typography
            style={{backgroundColor: 'yellow', color: 'black'}}>Not ready for public release</Typography>
          </Toolbar>
        </AppBar>
      </header>

      <Typography className={classes.warningText} color={'error'}>Individuals involved in
        Domestic Violence Situations may have
        further resources available that are not listed below. Please contact your emergency services number
        for
        assistance</Typography>
      <div className={classes.cardGroup}>
        {filteredShelters.map(shelter => {
          return (<Shelter
            shelter={shelter}
            key={shelter.id}
          />)
        })}
      </div>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper style={{paddingTop: 20}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem key={"menu1"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isIntoxicated}
                          onChange={handleChange('isIntoxicated')}
                          name="Menu1"
                          color="primary"
                        />
                      }
                      label="Intoxicated"
                    />
                  </MenuItem>
                  <MenuItem key={"menu2"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isNarcotics}
                          onChange={handleChange('isNarcotics')}
                          name="Menu2"
                          color="primary"
                        />
                      }
                      label="Narcotics"
                    />
                  </MenuItem>
                  <hr/>
                  <MenuItem key={"menu3"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isSingleMale}
                          onChange={handleChange('isSingleMale')}
                          name="Menu3"
                          color="primary"
                        />
                      }
                      label="Single Male"
                    />
                  </MenuItem>
                  <MenuItem key={"menu4"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isFamilyMale}
                          onChange={handleChange('isFamilyMale')}
                          name="Menu4"
                          color="primary"
                        />
                      }
                      label="Family Male"
                    />
                  </MenuItem>
                  <MenuItem key={"menu5"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isSingleFemale}
                          onChange={handleChange('isSingleFemale')}
                          color="primary"
                        />
                      }
                      label="Single Female"
                    />
                  </MenuItem>
                  <MenuItem key={"menu5"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isFamilyFemale}
                          onChange={handleChange('isFamilyFemale')}
                          color="primary"
                        />
                      }
                      label="Family Female"
                    />
                  </MenuItem>
                  <MenuItem key={"menu6"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={check.isChildren}
                          onChange={handleChange('isChildren')}
                          name="Menu6"
                          color="primary"
                        />
                      }
                      label="Allow Children"
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default App;
