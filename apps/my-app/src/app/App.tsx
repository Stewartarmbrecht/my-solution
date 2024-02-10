/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { MyState } from '@my-sample/my-state';
import { Shell } from './Shell';
import { MyBackend } from '@my-sample/my-backend';

export const App = () => {
  return (
    <MyState>
      <MyBackend>
        <Shell />
      </MyBackend>
    </MyState>
  );
};

export default App;
