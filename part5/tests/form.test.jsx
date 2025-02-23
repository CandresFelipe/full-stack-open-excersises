import { describe, vi, expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { CreateBlog } from "../src/components/CreateBlog";
import userEvent from "@testing-library/user-event";
import { blogService } from "../src/services/blogs";

vi.mock("axios");

describe("<CreateBlog /> Form component", () => {
  test("calls onNewBlogCreated with correct details when form is submitted", async () => {
    const mockOnNewBlogCreated = vi.fn();
    const createBlogSpy = vi
      .spyOn(blogService, "createBlog")
      .mockResolvedValue({
        data: {
          id: "123",
          title: "Test Blog",
          author: "John Doe",
          url: "http://example.com",
        },
      });
    const user = userEvent.setup();

    const screen = render(
      <CreateBlog onNewBlogCreated={mockOnNewBlogCreated} />
    );

    // Select input fields and button
    const titleInput = screen.getByLabelText(/Title/i);
    const authorInput = screen.getByLabelText(/Author/i);
    const urlInput = screen.getByLabelText(/Url/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    // Simulate user input
    await user.type(titleInput, "Test Blog");
    await user.type(authorInput, "John Doe");
    await user.type(urlInput, "http://example.com");
    await user.click(submitButton);

    // Wait for async function
    await waitFor(() => {
      expect(createBlogSpy).toHaveBeenCalledTimes(1);
      expect(createBlogSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Blog",
          author: "John Doe",
          url: "http://example.com",
        })
      );
      expect(mockOnNewBlogCreated).toHaveBeenCalledTimes(1);
    });
    createBlogSpy.mockRestore();
  });
});
