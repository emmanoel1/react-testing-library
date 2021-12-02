import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Test 05: Pokédex', () => {
  test('A Página Deve Conter Um h2 Com O Texto Correto', () => {
    RenderWithRouter(<App />);
    const pokemonsFind = /Encountered pokémons/i;
    const pokedexHeading = screen.getByRole('heading', { level: 2, name: pokemonsFind });
    expect(pokedexHeading).toBeDefined();
  });

  test('Deve Ser Exibido um Botão com o texto Próximo pokémon', () => {
    RenderWithRouter(<App />);
    const btnName = /Próximo pokémon/i;
    const btn = screen.getByRole('button', { name: btnName });
    expect(btn).toBeDefined();
  });

  test('Deve Ser Exibido Os Pokémons Na Ordem Correta Ao Clicar Em Próximo', () => {
    RenderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();

    const btnName = /Próximo pokémon/i;
    const btn = screen.getByRole('button', { name: btnName });
    userEvent.click(btn);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeDefined();
    userEvent.click(btn);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeDefined();
    userEvent.click(btn);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeDefined();
    userEvent.click(btn);

    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeDefined();
    userEvent.click(btn);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeDefined();
    userEvent.click(btn);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeDefined();
    userEvent.click(btn);

    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeDefined();
    userEvent.click(btn);

    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeDefined();
    userEvent.click(btn);

    const pikachuAgain = screen.getByText(/pikachu/i);
    expect(pikachuAgain).toBeDefined();
  });

  test('Deve Ser Exibido 1 Pokémon Por Vez', () => {
    RenderWithRouter(<App />);
    const btnName = /Próximo pokémon/i;
    const btn = screen.getByRole('button', { name: btnName });
    userEvent.click(btn);

    const pokemonCount = screen.getAllByText(/Average/i);
    const max = 1;
    expect(pokemonCount).toHaveLength(max);
  });

  test('A Pokédex Deve Conter Os Botões De Filtro Para Cada Tipo De Pokémon', () => {
    RenderWithRouter(<App />);
    const btn1 = screen.getAllByTestId('pokemon-type-button');
    expect(btn1[0]).toBeDefined();
    expect(btn1[1]).toBeDefined();
    expect(btn1[2]).toBeDefined();
    expect(btn1[3]).toBeDefined();
    expect(btn1[4]).toBeDefined();
    expect(btn1[5]).toBeDefined();
    expect(btn1[6]).toBeDefined();
  });

  test('A Partir Da Seleção Do Tipo, Deve Ser Exibido Apenas Aquele Tipo', () => {
    RenderWithRouter(<App />);
    const electric = /electric/i;
    const btn1 = screen.getByRole('button', { name: electric });
    userEvent.click(btn1);
    const type1 = screen.getAllByText(electric);
    expect(type1).toHaveLength(2);

    const fire = /fire/i;
    const btn2 = screen.getByRole('button', { name: fire });
    userEvent.click(btn2);
    const type2 = screen.getAllByText(fire);
    expect(type2).toHaveLength(2);

    const bug = /bug/i;
    const btn3 = screen.getByRole('button', { name: bug });
    userEvent.click(btn3);
    const type3 = screen.getAllByText(bug);
    expect(type3).toHaveLength(2);

    const poison = /poison/i;
    const btn4 = screen.getByRole('button', { name: poison });
    userEvent.click(btn4);
    const type4 = screen.getAllByText(poison);
    expect(type4).toHaveLength(2);

    const psychic = /psychic/i;
    const btn5 = screen.getByRole('button', { name: psychic });
    userEvent.click(btn5);
    const type5 = screen.getAllByText(psychic);
    expect(type5).toHaveLength(2);

    const normal = /normal/i;
    const btn6 = screen.getByRole('button', { name: normal });
    userEvent.click(btn6);
    const type6 = screen.getAllByText(normal);
    expect(type6).toHaveLength(2);

    const dragon = /dragon/i;
    const btn7 = screen.getByRole('button', { name: dragon });
    userEvent.click(btn7);
    const type7 = screen.getAllByText(dragon);
    const max = 3;
    expect(type7).toHaveLength(max);
  });
});

describe('Test 05: Button All', () => {
  test('O Botão All Deve Sempre Estar Visivel E Funcional', () => {
    const { history } = RenderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeDefined();

    const dragon = /dragon/i;
    const btn7 = screen.getByRole('button', { name: dragon });
    userEvent.click(btn7);
    const type7 = screen.getAllByText(dragon);
    const max = 3;
    expect(type7).toHaveLength(max);

    userEvent.click(btnAll);
    const electricText = /electric/i;
    const electric = screen.getAllByText(electricText);
    expect(electric).toHaveLength(2);
    history.push('/');

    const electricText2 = /electric/i;
    const electric2 = screen.getAllByText(electricText2);
    expect(electric2).toHaveLength(2);
  });
});
