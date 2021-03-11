/*

///import { render, screen, act } from '@testing-library/react';

import React from 'react'
*/
import MarkdownContent from '../lib/MarkdownContent';
import React from 'react';
import ReactDOM from 'react-dom';
// import Basic from '../basic_test';
import axios from 'axios';
//import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import {render, act, screen} from '@testing-library/react';
//Enzyme.configure({ adapter: new Adapter() })

jest.mock('axios');
//afterEach(cleanup)
// it('renders correctly enzyme', () => {
//     const res = {data: `## About`};
//     axios.get.mockResolvedValue(res);
//     const wrapper = shallow(<MarkdownContent content="" />);  
//     expect(toJson(wrapper)).toMatchSnapshot();
// });

it('Text in state is changed when button clicked', async () => {
    const res = {data: `## About`};
    axios.get.mockResolvedValue(res);
    await act(
        () =>
        new Promise((resolve) => {
        setImmediate(() => {
            // render(<MarkdownContent content="/content/about.md" />);
            render(<MarkdownContent content="" />);
            //expect(getByText(/About/i)).toBeInTheDocument();
            resolve();
        });
        })
    );

    const linkElement = screen.getByText(/About/i);
    expect(linkElement.textContent).toBe("About"); 

    // const { getByText } = render(<MarkdownContent content="" />);
    // expect(getByText(/About/i)).toBeInTheDocument();
 })

// https://dev.to/dannypule/fix-the-not-wrapped-in-act-warning-simple-solution-3lj1
// it('renders correctly', () => {
//     const res = {data: `## About`};
//     axios.get.mockResolvedValue(res);
//     const wrapper = shallow(<MarkdownContent content="" />);
//     // const tree = renderer
//     //   .create(<MarkdownContent content="" />)
//     //   .toJSON();

//     expect(wrapper).toMatchSnapshot();
// });

// test('renders learn react link', async () => { 
//   const res = {data: `## About`};
//   axios.get.mockResolvedValue(res);
//   await act(
//     () =>
//       new Promise((resolve) => {
//         setImmediate(() => {
//           render(<MarkdownContent content="/content/about.md" />);
//           resolve();
//         });
//       })
//   );
  
//   const linkElement = screen.getByText(/About/i);
//   expect(linkElement).toBeInTheDocument(); 
// });
  