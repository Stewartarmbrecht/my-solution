import { MyBackend } from '@my-sample/my-backend';
import { store } from './store'
import { Provider } from 'react-redux'
import { Synchronizer } from './Synchronizer';
export interface MyDataProps {
  children: JSX.Element;
}
export function MyData(props: MyDataProps) {
  return (
    <Provider store={store}>
      <MyBackend>
        <Synchronizer>
          {props.children}
        </Synchronizer>
      </MyBackend>
    </Provider>
  );
}