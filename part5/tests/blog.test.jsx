import { render, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Blog } from "../src/components/Blog";

describe("<Blog /> component", () => {
  test("The component renders but URL and likes are hidden by default", () => {
    const blogMockedData = {
      title: "This is the title for a blog demo",
      author: "Michael Nick",
    };
    const mockedFn = vi.fn();

    const component = render(
      <Blog
        blog={blogMockedData}
        updatedBlog={mockedFn}
        onDeleteBlog={mockedFn}
      />
    );

    expect(component).toBeDefined();
  });

  test("Checks the blog's URL and number of likes show when the detail button is pressed", () => {
    const mockBlog = {
      id: 1,
      title: "Test Blog",
      author: "Test Author",
      url: "http://testblog.com",
      likes: 10,
    };

    const mockUpdatedBlog = vi.fn();
    const mockOnDeleteBlog = vi.fn();

    const screen = render(
      <Blog
        blog={mockBlog}
        updatedBlog={mockUpdatedBlog}
        onDeleteBlog={mockOnDeleteBlog}
      />
    );

    // Simulate clicking the toggle button
    const toggleButton = screen.getByText("Show");
    fireEvent.click(toggleButton);

    // Verify that URL and likes are now visible
    expect(screen.getByText(`url: ${mockBlog.url}`)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${mockBlog.likes}`)).toBeInTheDocument();
  });

  test("The like button is pressed twice", () => {
    const mockBlog = {
      id: 1,
      title: "Test Blog",
      author: "Test Author",
      url: "http://testblog.com",
      likes: 0,
    };

    const mockUpdatedBlog = vi.fn();
    const mockOnDeleteBlog = vi.fn();

    const screen = render(
      <Blog
        blog={mockBlog}
        updatedBlog={mockUpdatedBlog}
        onDeleteBlog={mockOnDeleteBlog}
      />
    );

    // Simulate clicking the toggle button
    const toggleButton = screen.getByText("Show");
    fireEvent.click(toggleButton);

    // Simulate clicking the like button
    const likeButton = screen.getByText("like");
    fireEvent.click(likeButton);

    // Verify that the like count is updated
    expect(
      screen.getByText(`Likes: ${mockBlog.likes + 1}`)
    ).toBeInTheDocument();
  });
});
