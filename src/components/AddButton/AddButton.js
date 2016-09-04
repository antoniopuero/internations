import React from 'react';
import { Link } from 'react-router';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default function (props) {
  return (
    <FloatingActionButton
      containerElement={props.navigateTo ? <Link to={props.navigateTo}/> : <div/>}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px'
      }}
      onTouchTap={props.onAdd}
    >
      <ContentAdd />
    </FloatingActionButton>
  );
}