export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: { email?: string; phone?: string; source?: string };
};
