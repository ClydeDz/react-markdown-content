import MarkdownContent from '../lib/MarkdownContent';
import React from 'react';
import axios from 'axios';
import {render, act, screen, cleanup} from '@testing-library/react';

jest.mock('axios');

afterEach(cleanup)

describe('', () => {
    it('should take a snapshot', () => {
        const res = {data: `## About`};
        axios.get.mockResolvedValue(res);
        const { asFragment } = render(<MarkdownContent content="" />)
        expect(asFragment(<MarkdownContent content="" />)).toMatchSnapshot()
    })   

    it('should return correct HTML', async () => {
        const res = {data: "## About \r _bold text_"};
        axios.get.mockResolvedValue(res);
        
        await act(
            () =>
            new Promise((resolve) => {
            setImmediate(() => { 
                render(<MarkdownContent content="" />); 
                resolve();
            });
            })
        );

        const linkElement = screen.getByTestId('mdcontent');
        expect(linkElement.innerHTML).toBe("<h2>About</h2><p><em>bold text</em></p>"); 
    })

});