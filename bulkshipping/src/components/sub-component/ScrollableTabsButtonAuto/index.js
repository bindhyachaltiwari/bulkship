import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Paper, Tabs, Tab } from '@material-ui/core';
import './style.scss';

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <div role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tab-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (<Box >{children}</Box>)}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
}

function getTabs(tabsLabel, value) {
    const tabs = tabsLabel && tabsLabel.map((item, index) => {
        if (item.icon) {
            return (<Tab icon={item.icon} label={item.label} {...a11yProps(0)} key={`key-tab-${index}`} />);
        }
        return (<Tab label={item.label} {...a11yProps(0)} key={`key-tab-${index}`} />);
    });
    return tabs;
}

function getTabPanels(tabPanelChild, value) {
    const tabspanels = tabPanelChild && tabPanelChild.map((item, index) => {
        return (<TabPanel value={value} index={index} key={`key-tabpanel-${index}`}>
            {item.child}
        </TabPanel>);
    });

    return tabspanels;
}

function ScrollableTabsButtonAuto(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        const { onChange } = props;

        if(onChange(event, newValue)) {
            setValue(newValue);
        }
    }
    const { tabsLabel, tabPanelChild, TabIndicatorProps, paper } = props && props.tabs;
    const { isDirty, newTabVal } = props;
    if(isDirty !== undefined) {
        if(!isDirty && value!== newTabVal) {
            setValue(newTabVal);
        }
    }

    return (
        <div className={classes.root}>
            {
                paper ? <Paper square>
                    <Tabs value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        variant='scrollable'
                        scrollButtons='auto'
                        TabIndicatorProps={TabIndicatorProps}
                        aria-label='scrollable auto tab'
                    >
                        {getTabs(tabsLabel, value)}
                    </Tabs>
                </Paper>
                    :
                    <AppBar position='static' color='default'>
                        <Tabs value={value}
                            onChange={handleChange}
                            indicatorColor='primary'
                            textColor='primary'
                            variant='scrollable'
                            scrollButtons='auto'
                            TabIndicatorProps={TabIndicatorProps}
                            aria-label='scrollable auto tab'
                        >
                            {getTabs(tabsLabel, value)}
                        </Tabs>
                    </AppBar>
            }
            {getTabPanels(tabPanelChild, value)}
        </div>
    );
}

export default ScrollableTabsButtonAuto;