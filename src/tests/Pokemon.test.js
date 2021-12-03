import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

const allPokemonBtnId = 'pokemon-type-button';

describe('Test 06: Pokemon.js', () => {
  test('Deve ser Mostrado O Nome E O Tipo Correto Do pokémon', () => {
    RenderWithRouter(<App />);
    const pikachuBtn = screen.getAllByTestId(allPokemonBtnId);
    userEvent.click(pikachuBtn[0]);

    const pikachuName = screen.getByTestId('pokemon-name');
    const pikachuResult = 'Pikachu';
    expect(pikachuName.textContent).toEqual(pikachuResult);

    const pokemonType = screen.getByTestId('pokemon-type');
    const electricResult = 'Electric';
    expect(pokemonType.textContent).toEqual(electricResult);
  });

  test('O Peso Do Pokémon Deve Ser Exibido da Forma Correta', () => {
    RenderWithRouter(<App />);
    const pikachuBtn = screen.getAllByTestId(allPokemonBtnId);
    userEvent.click(pikachuBtn[0]);

    const pokemonType = screen.getByTestId('pokemon-weight');
    expect(pokemonType.textContent).toEqual('Average weight: 6.0 kg');
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    RenderWithRouter(<App />);
    const img = screen.getByAltText(/pikachu sprite/i);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toEqual(imgUrl);
  });

  test('O card do Pokémon indicado na Pokédex Deve conter o link Correto', () => {
    RenderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details.href).toEqual('http://localhost/pokemons/25');
  });

  test('Ao Clicar Em More Details, Deve Ser Exibida A Página De Detalhes.', () => {
    RenderWithRouter(<App />);
    const pikachuBtn = screen.getAllByTestId(allPokemonBtnId);
    userEvent.click(pikachuBtn[0]);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const detailText = screen.getByText('Pikachu Details');
    expect(detailText).toBeDefined();
  });

  test('Ao Clicar Em More Details, Deve Ser Exibida a Url Correta', () => {
    const { history } = RenderWithRouter(<App />);
    const pikachuBtn = screen.getAllByTestId(allPokemonBtnId);
    userEvent.click(pikachuBtn[0]);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Deve Ser Exibido o ícone correto ao favoritar o Pokémon', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pokemons/25');

    const favoriteBtn = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeChecked();

    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteIcon.src).toEqual('http://localhost/star-icon.svg');
  });
});
