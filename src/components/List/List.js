import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';

function extractMenuItemProps(item, menuItemProps) {
  return _.reduce(menuItemProps, (itemProps, itemProp, key) => {
    itemProps[key] = _.isFunction(itemProp) ? itemProp(item) : itemProp;
    return itemProps;
  }, {});
}

export default function (props) {
  const rightIconMenu = (item) => (
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
    >
      <MenuItem
        containerElement={<Link to={`${props.baseLink}/${item.id}`}/>}
      >
        View
      </MenuItem>
      <MenuItem
        onTouchTap={() => props.onDelete(item.id)}
      >
        {props.removeText || 'Delete'}
      </MenuItem>
    </IconMenu>
  );


  return (
    <List>
      <Subheader>{props.headerText}</Subheader>

      {props.items.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              {...extractMenuItemProps(item, props.menuItemProps)}
              rightIconButton={rightIconMenu(item)}
            />
            <Divider/>
          </div>
        );
      })}
    </List>
  );
}