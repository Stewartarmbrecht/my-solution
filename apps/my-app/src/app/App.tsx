/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { MyData } from '@my-sample/my-state';
import { Shell } from './Shell';
import { MyBackend } from '@my-sample/my-backend';

export const App = () => {
  return (
    <MyData>
      <MyBackend>
        <Shell />
      </MyBackend>
    </MyData>
  );
};

export default App;
