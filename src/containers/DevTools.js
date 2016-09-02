import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    defaultPosition="right"
    defaultSize={0.3}
    changePositionKey="ctrl-w"
    defaultIsVisible={false}
  >
    <LogMonitor />
  </DockMonitor>
);
