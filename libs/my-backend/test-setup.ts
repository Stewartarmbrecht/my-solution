import '@testing-library/jest-native/extend-expect';

// To correct error in test: [@RNC/AsyncStorage]: NativeModule: AsyncStorage is null.
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);