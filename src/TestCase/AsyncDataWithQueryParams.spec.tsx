import { getAllByRole, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AsyncDataWithQueryParams from "./AsyncDataWithQueryParams";
import { renderWithProviderAndRouter } from "../test-util";

describe("AsyncDataWithQueryParams component", () => {
  it("should fetch and display meetups based on query params", async () => {
    renderWithProviderAndRouter(<AsyncDataWithQueryParams />, {
      initialEntries: ["/?location=Tours&eventName=Touraine"],
    }) ;

    // Check initial state
    expect(screen.getByText("No meetups - click the fetch button")).toBeInTheDocument();

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

    const rows = getAllByRole(tbody, "row");
    expect(rows).toHaveLength(1);

    // Check that first row is rendered correctly
    const [row1] = getAllByRole(tbody, "row");
    const [name1, date1, location1] = getAllByRole(row1, "cell");
    expect(name1).toHaveTextContent("Touraine Tech");
    expect(date1).toHaveTextContent("2025-02-06");
    expect(location1).toHaveTextContent("Tours");
  });
  
  it("should fetch and display 3 meetups", async () => {
    renderWithProviderAndRouter(<AsyncDataWithQueryParams />, {
      initialEntries: ["/?eventName=Dev"],
    }) ;

    // Check initial state
    expect(screen.getByText("No meetups - click the fetch button")).toBeInTheDocument();

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

    const rows = getAllByRole(tbody, "row");
    expect(rows).toHaveLength(3);

    // Check that first row is rendered correctly
    const [row1] = getAllByRole(tbody, "row");
    const [name1, date1, location1] = getAllByRole(row1, "cell");
    expect(name1).toHaveTextContent("DevQuest");
    expect(date1).toHaveTextContent("2025-06-12");
    expect(location1).toHaveTextContent("Niort");
  });
});