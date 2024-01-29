import { store } from './store'
import { Provider } from 'react-redux'
export interface MyDataProps {
  children: JSX.Element;
}
export function MyData(props: MyDataProps) {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
}