import { Backend } from '@my-sample/my-backend';
import { store } from './store'
import { Provider } from 'react-redux'
import { Synchronizer } from './Synchronizer';
export interface BackendProps {
  children: JSX.Element;
}
export function MyData(props: BackendProps) {
  return (
    <Provider store={store}>
      <Backend>
        <Synchronizer>
          {props.children}
        </Synchronizer>
      </Backend>
    </Provider>
  );
}