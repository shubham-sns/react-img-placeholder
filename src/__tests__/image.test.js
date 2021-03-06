import * as React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { Image } from '../image/image';

const fakeSrc = 'https://image.xyz/source';
const workingSrc = 'https://i.redd.it/r0wkfwxs1d571.png';

afterEach(cleanup);

test('render with src', () => {
  render(
    <Image
      src={workingSrc}
      data-testid="color-block"
      height="200"
      width="200"
    />
  );

  waitFor(() =>
    expect(screen.getByRole('img')).toHaveAttribute('src', workingSrc)
  );
});

test('render with fallback src', async () => {
  render(
    <Image height="200" width="200" src={fakeSrc} placeholderSrc={workingSrc} />
  );

  waitFor(() =>
    expect(screen.getByRole('img')).toHaveAttribute('src', workingSrc)
  );
});

test('render default div', () => {
  render(
    <Image data-testid="color-block" src={fakeSrc} height="200" width="200" />
  );

  expect(screen.getByTestId('color-block')).toHaveAttribute(
    'style',
    'height: 200px; width: 200px; background: gray;'
  );
});

test('custom component load', () => {
  render(
    <Image
      data-testid="color-block"
      src={fakeSrc}
      height="200"
      width="200"
      placeholder={<h1>Not found</h1>}
    />
  );

  expect(screen.getAllByText(/not found/i));
});
