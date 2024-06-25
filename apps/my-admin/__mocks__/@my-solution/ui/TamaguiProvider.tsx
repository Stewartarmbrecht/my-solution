import { logSetup } from '@my-solution/shared';

export interface TamaguiProviderProps {
  children: JSX.Element;
}
export function TamaguiProvider(props: TamaguiProviderProps) {
  logSetup('MyState.MOCK');

  return (props.children);
}

