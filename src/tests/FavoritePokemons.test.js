import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Test 03: Favorite Pokémons', () => {
  test('Deve ser Exibido O Texto Correto Ao Abrir a Página Sem Favoritar', () => {
    RenderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);

    const noFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeDefined();
  });

  test.only('Deve Ser Exibido Os Cards Corretos Ao Favoritar', () => {
    const { history } = RenderWithRouter(<App />);

    const pikachuCard = screen.getByRole('link', { name: /more details/i });
    const pikachu = screen.getByRole('button', { name: /electric/i });
    userEvent.click(pikachu);
    userEvent.click(pikachuCard);

    const favoritePikachu = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoritePikachu);
    expect(favoritePikachu).toBeChecked();

    history.push('/');

    const charmanderCard = screen.getByRole('link', { name: /more details/i });
    const charmander = screen.getByRole('button', { name: /fire/i });
    userEvent.click(charmander);
    userEvent.click(charmanderCard);

    const favoriteCharmander = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteCharmander);
    expect(favoritePikachu).toBeChecked();

    history.push('/');

    const dragonairCard = screen.getByRole('link', { name: /more details/i });
    const dragonair = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonair);
    userEvent.click(dragonairCard);

    const favoriteDragonair = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteDragonair);
    // const dragonairTitle = screen.getByText(/Dragonair Details?/i);
    expect(favoriteDragonair).toBeChecked();

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);

    const favorites = screen.getAllByText(/Average/i);
    const max = 3;
    expect(favorites).toHaveLength(max);
  });
});
