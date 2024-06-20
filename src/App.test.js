import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./components/card-component', () => () => <div>Mock CardComponent</div>);

describe('App', () => {
  test('renders the Header component', () => {
    render(
      <App />
    );
    expect(screen.getByText('Star Wars Info')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Planets')).toBeInTheDocument();
    expect(screen.getByText('Starships')).toBeInTheDocument();
  });

  test('renders the Home component when at the root path', () => {
    render(
      <App />
    );
    expect(screen.getByText('Welcome to the Star Wars Info App')).toBeInTheDocument();
    expect(screen.getByText('Select a category to explore Star Wars data.')).toBeInTheDocument();
  });

  test('renders the CardComponent for any other path', () => {
    window.history.pushState({}, 'Test page', '/some-other-path');
    
    render(
      <App />
    );
    expect(screen.getByText('Mock CardComponent')).toBeInTheDocument();
  });
});
