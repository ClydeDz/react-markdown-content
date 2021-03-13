import MarkdownContent from '../lib/MarkdownContent';
import React from 'react';
import axios from 'axios';
import {render, act, screen, cleanup, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
jest.mock('axios');

afterEach(cleanup)

describe('', () => {
    it('should take a snapshot', async () => {
        const res = {data: `## About`};
        axios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent content="" />); 
        });
        
        expect(renderedComponent).toMatchSnapshot()
    })   

    it('should return correct HTML', async () => {
        const res = {data: "## About \r _bold text_"};
        axios.get.mockResolvedValue(res);        

        await act(async () => {
            render(<MarkdownContent content="" />); 
        });

        const linkElement = await screen.findByTestId('mdcontent');
        expect(linkElement.innerHTML).toBe("<h2>About</h2><p><em>bold text</em></p>");
        
    })

});