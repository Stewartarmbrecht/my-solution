import { Link } from 'expo-router';
import React from 'react';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  return (
    <Link
      target="_blank"
      {...props}
      href={props.href}
    />
  );
}
