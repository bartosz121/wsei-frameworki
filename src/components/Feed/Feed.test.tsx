import React from "react";
import { render, screen } from "@testing-library/react";
import { Feed } from "./Feed";

const mockData = [
  { id: 1, title: "Mock Title 1" },
  { id: 2, title: "Mock Title 2" },
  { id: 3, title: "Mock Title 3" },
];

describe("Feed component", () => {
  it("renders the feed data correctly", () => {
    render(
      <Feed
        component={({ data }) => <div>{data.title}</div>}
        apiEndpoint="posts"
        addedArray={mockData}
      />
    );

    expect(screen.getByText("Mock Title 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Title 2")).toBeInTheDocument();
    expect(screen.getByText("Mock Title 3")).toBeInTheDocument();
  });
});
