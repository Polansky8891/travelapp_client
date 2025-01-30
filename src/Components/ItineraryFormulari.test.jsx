import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddItineraryForm from "./ItineraryFormulari";

describe("AddItineraryForm Component", () => {
  test("shows validation errors when fields are empty", async () => {
    render(<AddItineraryForm />);

    fireEvent.click(screen.getByText("Add itinerary"));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Image URL is required")).toBeInTheDocument();
    expect(screen.getByText("At least one city is required")).toBeInTheDocument();
    expect(screen.getByText("Country is required")).toBeInTheDocument();
    expect(screen.getByText("Days must be a positive number")).toBeInTheDocument();
    expect(screen.getByText("Type is required")).toBeInTheDocument();
    expect(screen.getByText("Difficulty must be between 1 and 5")).toBeInTheDocument();
    expect(screen.getByText("Price must be a positive number")).toBeInTheDocument();
  });

  test("allows submission when all fields are valid", async () => {
    render(<AddItineraryForm />);

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Trip to Paris" } });
    fireEvent.change(screen.getByLabelText("Image URL:"), { target: { value: "http://example.com/image.jpg" } });
    fireEvent.change(screen.getByLabelText("City"), { target: { value: "Paris" } });
    fireEvent.change(screen.getByLabelText("Country:"), { target: { value: "France" } });
    fireEvent.change(screen.getByLabelText("Days:"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Type:"), { target: { value: "Adventure" } });
    fireEvent.change(screen.getByLabelText("Difficulty"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "200" } });

    fireEvent.click(screen.getByText("Add itinerary"));

    await waitFor(() => expect(screen.queryByText("Name is required")).not.toBeInTheDocument());
  });

  test("validates numerical fields correctly", async () => {
    render(<AddItineraryForm />);

    fireEvent.change(screen.getByLabelText("Days:"), { target: { value: "-5" } });
    fireEvent.change(screen.getByLabelText("Difficulty:"), { target: { value: "6" } });
    fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "0" } });

    fireEvent.click(screen.getByText("Add itinerary"));

    expect(await screen.findByText("Days must be a positive number")).toBeInTheDocument();
    expect(screen.getByText("Difficulty must be between 1 and 5")).toBeInTheDocument();
    expect(screen.getByText("Price must be a positive number")).toBeInTheDocument();
  });
});
