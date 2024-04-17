// istanbul ignore file
import { config } from '@tamagui/config/v3'
import { themes } from './themes';
import { createTamagui } from 'tamagui'

config.themes = themes;

export const tamaguiConfig = createTamagui(config)
export default tamaguiConfig
export type Conf = typeof tamaguiConfig
declare module 'tamagui' {

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends Conf {}

}
