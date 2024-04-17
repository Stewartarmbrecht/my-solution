import { logSetup } from "@my-solution/shared";

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

export const ThemeProvider = (props: HasChildProps) => {
  logSetup('ThemeProvider.MOCK');

  return (props.children);
}

export const defaultDarkModeOverride = {
  tokens: {
    colors: {
      primary: {
        10: 'hsl(201, 100%, 99.2%)',
        20: 'hsl(201, 97%, 90%)',
        40: 'hsl(201, 93%, 80%)',
        60: 'hsl(201, 87%, 70%)',
        80: 'hsl(201, 83%, 60%)',
        90: 'hsl(201, 77%, 50%)',
        100: 'hsl(201, 70%, 35%)',
      },
    }
  },
  colorMode: 'dark',
};
