import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import Glove from './Glove';
import Facemask from './Facemask';
import Beanie from './Beanie';

const NavBar = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
      <div>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
                <Tab label="Gloves" />
                <Tab label="Facemasks" />
                <Tab label="Beanies" />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <Glove gloveData={props.gloves}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Facemask facemaskData={props.facemasks}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Beanie beanieData={props.beanies}/>
        </TabPanel>
      </div>
    );
  };

export default NavBar;