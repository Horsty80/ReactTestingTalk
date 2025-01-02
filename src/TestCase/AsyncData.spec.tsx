import { getAllByRole, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AsyncData from "./AsyncData";
import { renderWithProviders } from "../test-util";

describe("AsyncData component", () => {
  it("should fetch and display meetups", async () => {
    const { user } = renderWithProviders(<AsyncData />);

    // Check initial state
    expect(screen.getByText("No meetups - click the fetch button")).toBeInTheDocument();

    // Interact with the component
    const fetchMeetupButton = screen.getByRole("button", { name: "Fetch Meetups" });
    await user.click(fetchMeetupButton);

    // Check loading state
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // Check that the table is rendered
    const [thead, tbody] = screen.getAllByRole("rowgroup");

    // Check that thead is rendered correctly
    const columns = getAllByRole(thead, "columnheader");
    expect(columns).toHaveLength(3);
    expect(columns[0]).toHaveTextContent("Name");
    expect(columns[1]).toHaveTextContent("Date");
    expect(columns[2]).toHaveTextContent("Location");

    // Check that first row is rendered correctly
    const [row1] = getAllByRole(tbody, "row");
    const [name1, date1, location1] = getAllByRole(row1, "cell");
    expect(name1).toHaveTextContent("Touraine Tech");
    expect(date1).toHaveTextContent("2025-02-06");
    expect(location1).toHaveTextContent("Tours");
  });
});
