import "@testing-library/jest-dom/extend-expect";
import {act, cleanup, render, screen} from "@testing-library/react";
import axios from "axios";
import React from "react";
import MarkdownContent from "../lib/MarkdownContent";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(cleanup);

describe("", () => {
    it("should take a snapshot", async () => {
        const res = {data: `## About`};
        mockedAxios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent content="" />);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should return correct HTML", async () => {
        const res = {data: "## About \r _bold text_"};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId("mdcontent");
        expect(linkElement.innerHTML).toBe("<h2>About</h2><p><em>bold text</em></p>");

    });
});
