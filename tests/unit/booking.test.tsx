import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingForm } from "@/components/booking-form";
import { demoBookingAdapter } from "@/lib/booking-adapter";
async function preference() {
  fireEvent.change(screen.getByLabelText("Date souhaitée"), {
    target: { value: "2099-10-12" },
  });
  fireEvent.change(screen.getByLabelText("Créneau souhaité"), {
    target: { value: "Matin" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Continuer/ }));
}
describe("private booking flow", () => {
  it("validates preferences and preserves values when going back", async () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("button", { name: /Continuer/ }));
    expect(
      screen.getByText(
        "Choisissez une date valide, aujourd’hui ou dans le futur.",
      ),
    ).toBeVisible();
    await preference();
    await userEvent.type(screen.getByLabelText("Nom complet"), "Sample Person");
    fireEvent.click(screen.getByRole("button", { name: "Retour" }));
    expect(screen.getByLabelText("Date souhaitée")).toHaveValue("2099-10-12");
    fireEvent.click(screen.getByRole("button", { name: /Continuer/ }));
    expect(screen.getByLabelText("Nom complet")).toHaveValue("Sample Person");
  });
  it("requires consent, completes once on rapid clicks, and clears personal values", async () => {
    const send = vi.spyOn(demoBookingAdapter, "submit");
    render(<BookingForm />);
    await preference();
    fireEvent.change(screen.getByLabelText("Nom complet"), {
      target: { value: "Sample Person" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "sample@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Continuer/ }));
    expect(
      screen.getByText(
        "Acceptez la notice de confidentialité et le contact concernant votre demande.",
      ),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Continuer/ }));
    expect(screen.getByText("sample@example.com")).toBeVisible();
    const submit = screen.getByRole("button", {
      name: /Terminer la demande de démonstration/,
    });
    fireEvent.click(submit);
    fireEvent.click(submit);
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Aucun rendez-vous n’a été réservé",
      ),
    );
    expect(send).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("sample@example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Person")).not.toBeInTheDocument();
  });
});
