import { logSetup } from '@my-solution/shared';

export interface BackendProps {
  children: JSX.Element;
}
export function Backend(props: BackendProps) {
  logSetup('Backend.MOCK');

  return (props.children);
}

