import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import AppBar from "./AppBar";
import Map from "./Map";
import { getVenus } from "./getVenue";
import { GenerateList } from "./generateList";
import TextField from '@material-ui/core/TextField';
import {styles} from "../styles/Drawer";

class ResponsiveDrawer extends React.Component {

  //State of the component
  state = {
    mobileOpen: false,
    venues: [],
    updateResult: [],
    fly: ""
  };

  componentDidMount() {
    //Fetching venues from four square api
    getVenus().then(res => { 
      this.setState({ 
        venues: res.data.response.groups[0].items, 
        updateResult: res.data.response.groups[0].items 
      }) 
    })
    .catch(err=>{
      alert(err);
    });
  }

  //Toggle drawer on mobile screen
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  //Method for search feature means searhing/filter items
  search = (event) => {
    if (event.target.value) {
      let updateList = this.state.venues.filter((val, ind) => {
        return val.venue.name.toLowerCase().search(
          event.target.value.toLowerCase()
        ) !== -1;
      });
      this.setState({
        updateResult: updateList,
        fly: ""
      })
    }
    else {
      this.setState({
        updateResult: this.state.venues,
        fly: ""
      })
    }
  }

  //Method for click items
  onClickHandler = (currentLocation) => {
    this.setState({
      fly: currentLocation
    })
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <TextField
            id="standard-name"
            label="Search Food Restaurant"
            className={classes.textField}
            value={this.state.name}
            margin="normal"
            onChange={this.search}
          />
        </div>
        <Divider />
        <GenerateList updateResult={this.state.updateResult} onClickHandler={this.onClickHandler} />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar handleDrawerToggle={() => this.handleDrawerToggle()} classes={classes.appBar} menuButton={classes.menuButton} />
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Map venues={this.state.updateResult} fly={this.state.fly} />
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);