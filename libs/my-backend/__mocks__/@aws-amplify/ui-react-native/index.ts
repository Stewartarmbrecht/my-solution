import { logSetup } from "@my-sample/my-shared";

export interface HasChildProps {
  children: JSX.Element;
}
export function Authenticator(props: HasChildProps) {
  logSetup('Authenticator.MOCK');

  return (props.children);
}
Authenticator.Provider  = (props: HasChildProps) => {
  logSetup('Authenticator.Provider.MOCK');

  return (props.children);
}