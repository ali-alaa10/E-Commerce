import { it, describe, vi, beforeEach, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { HomePage } from "./HomePage";

describe("Home Page Component", () => {
  let fetchCartItems;

  vi.mock("axios");

  beforeEach(() => {
    fetchCartItems = vi.fn();

    axios.get.mockImplementation(async (url) => {
      if (url === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });

  it("should render the home page", async () => {
    render(
      <MemoryRouter>
        <HomePage cartItems={[]} fetchCartItems={fetchCartItems} />
      </MemoryRouter>
    );
    const productsContainers = await screen.findAllByTestId(
      "product-container"
    );

    expect(productsContainers.length).toBe(2);

    expect(
      within(productsContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    );
    expect(
      within(productsContainers[1]).getByText("Intermediate Size Basketball")
    );
  });
});
