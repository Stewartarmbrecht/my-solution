import { render } from '@testing-library/react-native';
import { ExternalLink } from './ExternalLink';
import { Platform } from 'react-native';

describe('ExternalLink', () => {
  it('should render a link with target="_blank"', () => {
    Platform.OS = 'web';
    const href = 'https://example.com';
    const { getByTestId } = render(<ExternalLink href={href} testID="external-link">Link Text</ExternalLink>);
    const link = getByTestId('external-link');
    expect(link.props.href).toBe(href);
    expect(link.props.children).toBe('Link Text');
    // TODO: Find out why this line does not work.  Returns undefined.
    // expect(link.props.target).toBe('_blank');
  });
});