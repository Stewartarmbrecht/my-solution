/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { MyState } from '@my-solution/my-state';
import { Shell } from './Shell';
import { MyBackend } from '@my-solution/my-backend';

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
