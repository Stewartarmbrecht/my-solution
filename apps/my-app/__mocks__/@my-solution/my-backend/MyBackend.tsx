import { logSetup } from '@my-solution/my-shared';

export interface MyBackendProps {
  children: JSX.Element;
}
export function MyBackend(props: MyBackendProps) {
  logSetup('MyBackend.MOCK');

  return (props.children);
}

