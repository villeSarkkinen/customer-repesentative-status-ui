import React from 'react';
import { render } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export function renderWithRouter(
    ui,
    {
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
  ) {
    return {
      ...render(<Router history={history}>{ui}</Router>),
      history,
    }
  }