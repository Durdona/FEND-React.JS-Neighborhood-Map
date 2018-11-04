import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


//Generating list items
export const GenerateList = (props) => {
  let list = props.updateResult;
  return (
    <List role="listbox" dense={true}>
      {list.map((val, key) => {
        return (<ListItem tabindex="0" style={{ cursor: 'pointer' }} key={key} onClick={() => props.onClickHandler(val)}>
          <ListItemText
            primary={val.venue.name}
          />
        </ListItem>)
      })}
    </List>
  )
}
