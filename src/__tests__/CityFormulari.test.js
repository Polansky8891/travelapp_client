import { render, screen, fireEvent } from "@testing-library/react";
import AddCityForm from "../Components/CityFormulari"; // Ajusta la ruta según tu estructura
import React from "react";
import "@testing-library/jest-dom";


describe("Add City Button", () => {
    test("renders the Add City button", () => {
    const handleSubmit = jest.fn();
      render(<AddCityForm onSubmit={handleSubmit} />);

      const submitButton = screen.getByRole("button", { name: /add city/i });
      fireEvent.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

});
      
