import React from 'react';
import { render, fireEvent,wait,waitForElement, getByDisplayValue, queryByText} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<FamilyContainer/>
			</Router>
		);
	}).not.toThrowError();
});

test ("Checking" ,async () => {
    let {container,getByText} = render(<Router><FamilyContainer /></Router>);


    let continueBtn = container.querySelector('button[name="continue"');
    fireEvent.click(continueBtn);
    await wait(() =>{		
        expect(getByText(/Are you sure you want to proceed/i));

    });
    
    
    fireEvent.click(getByText(/Cancel/i));
    await wait(() =>{		
		expect(getByText(/Register Now./i));
    });

// fireEvent.click(continueBtn);
// await wait(() =>{		
//     expect(getByText(/Are you sure you want to proceed/i));

// });


// fireEvent.click(okBtn);
});
