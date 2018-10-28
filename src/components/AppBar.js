import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const AppBarComponent = (props) => {
  const { classes, handleDrawerToggle, menuButton } = props;
  return (
    <AppBar position="fixed" className={classes}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Neighborhood Map Application
            </Typography>
      </Toolbar>
    </AppBar>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object,
  menuButton: PropTypes.object
};

export default AppBarComponent;