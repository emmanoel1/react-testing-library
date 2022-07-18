import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Test 04: Not Found', () => {
  test('A Página Deve Conter Um h2 Com O Texto Correto', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pipoca');

    const notFound = /Page requested not found/i;
    const crying = screen.getByRole('heading', { level: 2, name: notFound });
    expect(crying).toBeDefined();
  });

  test('A Página Deve Conter O Gif Correto', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pipoca');

    const gifUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gifToCompare = screen.getByAltText(/pikachu crying/i);

    expect(gifToCompare.src).toContain(gifUrl);
  });
});
