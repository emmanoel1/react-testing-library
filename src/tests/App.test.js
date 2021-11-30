import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Test 01: App', () => {
  test('O 1° Link, Deve Conter O Texto Home', () => {
    RenderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeDefined();
  });

  test('O 2° Link, Deve Conter O Texto About', () => {
    RenderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeDefined();
  });

  test('O 3° Link, Deve Conter O Texto Favorite Pokémons', () => {
    RenderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeDefined();
  });

  test('Ao Clicar Em Home, Verifica Se Estou Na Rota / ', () => {
    const { history } = RenderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Ao Clicar Em About, Verifica Se Estou Na Rota /about ', () => {
    const { history } = RenderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Ao Clicar Em Pokémons Favoritados, Verifica Se Estou Na Rota /favorites ', () => {
    const { history } = RenderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Ao Ser Redirecionado Para Uma Rota Errada, Aparece a Página Not Found', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pipoca');

    const crying = screen.getByText(/Page requested not found/i);
    expect(crying).toBeInTheDocument();
  });
});
