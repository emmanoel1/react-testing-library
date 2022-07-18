import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import { About } from '../components';

describe('Test 02: About', () => {
  test('A Página Deve Conter Um Heading h2 Com O Texto About Pokédex', () => {
    RenderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeDefined();
  });

  test('A Página Deve Conter Os Textos Sobre A Pokédex', () => {
    RenderWithRouter(<About />);
    const firstText = screen.getByText(/This application simulates a Pokédex/i);
    const secondText = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstText).toBeDefined();
    expect(secondText).toBeDefined();
  });

  test('A Página Deve Conter A Imagem Correta Da Pokédex', () => {
    RenderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgToCompare = screen.getByAltText(/Pokédex/i);
    expect(imgToCompare.src).toContain(imgUrl);
  });
});
