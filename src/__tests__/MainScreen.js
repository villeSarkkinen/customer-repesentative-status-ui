import 'react-native';
import React from 'react';
import { cleanup, render, waitForElement } from 'react-testing-library';
import axiosMock from 'axios';
import { renderWithRouter } from './testUtils';
import Navigation from '../containers/Navigation';
import MainScreen from '../containers/MainScreen';
import { url } from '../components/utils/constants';
  
  afterEach(() => {
    cleanup();
    window.localStorage.removeItem('Auth');
  });
const token = 'Test Token';




it('Renders the main screen successfully', async() => {
  window.localStorage.setItem('Auth', token);
  const { getByText } = await renderWithRouter(<Navigation />);
  
  expect(getByText(/Main Screen/i)).toBeTruthy();
});

it('Redirects unauthorized user', async() => {
  expect(window.localStorage.getItem('Auth')).toBeFalsy();

  const { getByTestId } = await renderWithRouter(<Navigation />, { route: '/' });
  expect(getByTestId(/login/i)).toBeTruthy();
});

it('Fetches and displays needed data', async() => {
  expect(window.localStorage.getItem('Auth')).toBeFalsy();


  window.localStorage.setItem('Auth', token);
  expect(window.localStorage.getItem('Auth')).toBe(token);

  const { getByText } = render(<MainScreen />);

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(`${url}/data.php`, { headers: {
    'Bearer': token,
    'allow-control-allow-headers': '*' 
  }});
  const loadingIndicator = await waitForElement(() => getByText(/loading/i));
  expect(loadingIndicator).toBeTruthy();
  const groupItem = await waitForElement(() => getByText(/Group 1/));
  expect(groupItem).toBeTruthy();
  expect(getByText(/John Doe/)).toBeTruthy();
})