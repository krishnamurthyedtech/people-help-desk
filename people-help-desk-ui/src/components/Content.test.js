import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './Content';

test('renders videos with titles and descriptions', () => {
  render(<Content selectedCategory="All" />);
  
  // Verify first video title and description are in the document
  expect(screen.getByText('Family Law Act & Family Court Procedures')).toBeInTheDocument();
  expect(screen.getByText(/comprehensive guide to understanding the Family Law Act/i)).toBeInTheDocument();
});

test('filters videos according to selected category', () => {
  render(<Content selectedCategory="HEALTH" />);
  
  expect(screen.getByText('Fitness & Lifestyle Habits for a Strong, Resilient Body')).toBeInTheDocument();
  expect(screen.queryByText('Family Law Act & Family Court Procedures')).not.toBeInTheDocument();
});
