import React from 'react';
import { render, fireEvent, getByTestId, waitForElement, cleanup } from '@testing-library/react';
import PasswordRegistrationFormComponent from '../PasswordRegistrationFormComponent';
import { noop, mockPasswordBuilder } from '../../../Testing';

describe('PasPasswordRegistrationFormComponents',()=>{
  test('should render without data', () => {
    expect(() => {
      render(
        <PasswordRegistrationFormComponent
        ref = {noop}
          onSelectedChild={noop}
          onFormErrors={noop}
          getPasswordStatus={jest.fn()}
        />
      );
    }).not.toThrowError();
  });
  
  test('should render with data provided', () => {
    expect(() => {
      render(
        <PasswordRegistrationFormComponent
        ref={jest.fn()}
          onSelectedChild={noop}
          onFormErrors={noop}
          getPasswordStatus={jest.fn()}
        />
      );
    }).not.toThrowError();
    cleanup()
  });
  
  test('should have working input field validations', async () => {
      const {container} = render(
        <PasswordRegistrationFormComponent
        ref={jest.fn()}
          onSelectedChild={noop}
          onFormErrors={noop}
          getPasswordStatus={jest.fn()}
        />
      );

      // Select input fields
      const password = container.querySelector('input[name="password"]');
      const passwordConfirm = container.querySelector('input[name="passwordConfirm"]');
      
      const fakePwd = mockPasswordBuilder.password;

      // checking Required message
      fireEvent.change(passwordConfirm,{target:{value:''}})// with empty value  for passwordConfirm
      fireEvent.change(password,{target:{value:fakePwd}}) 
      fireEvent.blur(passwordConfirm);
    let showPwdConfirmError = await waitForElement(
      () =>  getByTestId(container,'password-confirm'),
      { container }
    )
    expect(showPwdConfirmError).toHaveTextContent('This field is required');

      fireEvent.change(password,{target:{value:''}}) //with content
      fireEvent.change(passwordConfirm,{target:{value:fakePwd}})
      fireEvent.blur(passwordConfirm);
    let showPwdConfirmError2 = await waitForElement(
      () =>  getByTestId(container,'password'),
      { container }
    )
    expect(showPwdConfirmError2).toHaveTextContent('This field is required');

    // pending checking switch default statement
    cleanup()
  });


  test('password and confirm password fields should be same',async()=>{
    const {container,} = render(
      <PasswordRegistrationFormComponent
      ref={jest.fn()}
        onSelectedChild={noop}
        onFormErrors={noop}
        getPasswordStatus={jest.fn()}
      />
    );

    // Select input fields
    const password = container.querySelector('input[name="password"]');
    const passwordConfirm = container.querySelector('input[name="passwordConfirm"]');
    // fake Data
    const fakePwd = mockPasswordBuilder.password;
    const fakePwd2 = 'randomPassword';


    fireEvent.change(password,{target:{value:fakePwd}})
    fireEvent.change(passwordConfirm,{target:{value:fakePwd2}})
    fireEvent.blur(passwordConfirm);
    const samePwdError = await waitForElement(
      () =>  getByTestId(container,'pwdSameError'),
      { container }
    );
    expect(samePwdError).toHaveTextContent('Password must be same');


    fireEvent.change(password,{target:{value:fakePwd}})
    fireEvent.change(passwordConfirm,{target:{value:fakePwd}})
    fireEvent.blur(passwordConfirm);
    const samePwdError2 = await waitForElement(
      () =>  getByTestId(container,'pwdSameError'),
      { container }
    );
    expect(samePwdError2).toHaveTextContent('');
  });
});