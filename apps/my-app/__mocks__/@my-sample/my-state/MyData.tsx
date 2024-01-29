import { store } from '@my-sample/my-state';
import { Provider } from 'react-redux';


export interface MyDataProps {
  children?: React.ReactNode;
}
export function MyData(props: MyDataProps) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
}
