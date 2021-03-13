import "@testing-library/jest-dom/extend-expect";
import {act, cleanup, render, screen} from "@testing-library/react";
import axios from "axios";
import React from "react";
import MarkdownContent from "../lib/MarkdownContent";
import { GetTestFixture, TestFixtures, TestFixtureResults } from "./fixtures/GetTestFixtures";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const TEST_ID = "mdcontent";

afterEach(cleanup);

describe("", () => {
    it("should take a snapshot", async () => {
        const res = {data: GetTestFixture(TestFixtures.SIMPLE)};
        mockedAxios.get.mockResolvedValue(res);

        let renderedComponent;
        await act(async () => {
            renderedComponent = render(<MarkdownContent content="" />);
        });

        expect(renderedComponent).toMatchSnapshot();
    });

    it("should return correct HTML", async () => {
        const res = {data: GetTestFixture(TestFixtures.SIMPLE)};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement.innerHTML).toBe(TestFixtureResults.SIMPLE);
    });

    it("should return correct HTML", async () => {
        const res = {data: GetTestFixture(TestFixtures.LINKS)};
        mockedAxios.get.mockResolvedValue(res);

        await act(async () => {
            render(<MarkdownContent content="" />);
        });

        const linkElement = await screen.findByTestId(TEST_ID);
        expect(linkElement.innerHTML).toBe(TestFixtureResults.LINKS);
    });
});
