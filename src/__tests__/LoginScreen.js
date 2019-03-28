import 'react-native';
import React from 'react';
import { fireEvent, cleanup, waitForElement } from 'react-testing-library';
import axiosMock from 'axios';
import { renderWithRouter } from './testUtils';
import Navigation from '../containers/Navigation';
import { url } from '../components/utils/constants';

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

fireEvent.press = (node, init) => {
  fireEvent.mouseDown(node, init);
  fireEvent.mouseUp(node, init);
};

const loginCreds = { target: { value: 'login' }};

it('Logs in successfully', async() => {
  axiosMock.post.mockResolvedValueOnce({data: 'token'})
  
  const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter(<Navigation />);

  expect(window.localStorage.getItem('Auth')).toBeFalsy();
  const emailInput = getByPlaceholderText('Email');
  expect(emailInput).toBeTruthy();
  const passwordInput = getByPlaceholderText('Password');
  expect(passwordInput).toBeTruthy();
  const loginButton = getByTestId('loginButton');
  expect(loginButton).toBeTruthy();



  fireEvent.change(emailInput, loginCreds);
  fireEvent.change(passwordInput, loginCreds);
  fireEvent.press(loginButton);

  const mainScreen = await waitForElement(() => getByText(/main screen/i))
  expect(window.localStorage.getItem('Auth')).toBeTruthy();
  expect(mainScreen).toBeTruthy();
  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(axiosMock.post).toHaveBeenLastCalledWith(`${url}/login.php`, {"data": {"email": "login", "password": "login"}, "headers": {"allow-control-allow-headers": "*"}});
});

it('Logs in using token from storage', async() => {
     window.localStorage.setItem('Auth', 'true');
    expect(window.localStorage.getItem('Auth')).toBeTruthy();
    const { getByText } = await renderWithRouter(<Navigation />);
    
    expect(getByText('Main Screen')).toBeTruthy();
});

it('Notifies the user about empty fields in login screen', () =>{
  const { getByTestId, getByPlaceholderText, getAllByText } = renderWithRouter(<Navigation />);
  
  const loginButton = getByTestId('loginButton');
  expect(loginButton).toBeTruthy();
  const emailInput = getByPlaceholderText('Email');
  
  fireEvent.press(loginButton);
  expect(getAllByText(/cannot be empty/i)).toHaveLength(2);
  
  fireEvent.change(emailInput, loginCreds)
  fireEvent.press(loginButton);

  expect(getAllByText(/cannot be empty/i)).toHaveLength(1);
});

it('It notifies about the user invalid login', async() => {
  axiosMock.post.mockResolvedValueOnce({ data: 'un' })
  const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter(<Navigation />);

  const loginButton = getByTestId('loginButton');
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');

  fireEvent.change(emailInput, loginCreds);
  fireEvent.change(passwordInput, loginCreds);
  fireEvent.press(loginButton);

  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(axiosMock.post).toBeCalledWith(`${url}/login.php`, {"data": {"email": "login", "password": "login"}, "headers": {"allow-control-allow-headers": "*"}})

  const loading = await waitForElement(() => getByText(/Loading/i));
  expect(loading).toBeTruthy();
  const invalidMessage = await waitForElement(() => getByText(/invalid/i));
  expect(invalidMessage).toBeTruthy();
})