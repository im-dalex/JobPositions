import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { JobsList } from "@/components/JobsList";
import { mockPositions } from "../mocks/jobPositions";

describe("JobsList", () => {
  it("renders the list of job positions", () => {
    render(
      <JobsList
        positions={mockPositions}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });

  it("calls onEdit and onDelete when clicking buttons", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <JobsList positions={mockPositions} onEdit={onEdit} onDelete={onDelete} />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(onEdit).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
  });
});
