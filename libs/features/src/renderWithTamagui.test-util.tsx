import { render } from '@testing-library/react-native';
import { tamaguiConfig, TamaguiProvider } from '@my-solution/ui';

export const renderWithTamagui: typeof render = (component) => {
  return render(
    <TamaguiProvider config={tamaguiConfig}>
      {component}
    </TamaguiProvider>
  );
};
