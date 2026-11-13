export type ConsultationRequest = {
  treatment: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};
export interface BookingAdapter {
  mode: "demo" | "live";
  submit: (
    request: Readonly<ConsultationRequest>,
  ) => Promise<{ kind: "simulated" | "requested" }>;
}
// Deliberately no fetch, storage, logging, timer, or retained request reference.
export const demoBookingAdapter: BookingAdapter = {
  mode: "demo",
  async submit() {
    return { kind: "simulated" };
  },
};
