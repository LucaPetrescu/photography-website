import { z } from "zod";

/**
 * Authoritative contact-form schema. Validation runs server-side in the Server
 * Action; HTML attributes provide a first pass on the client.
 */
export const contactSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "Please enter your first name.")
      .max(60, "That first name is a little too long."),
    lastName: z
      .string()
      .trim()
      .min(1, "Please enter your last name.")
      .max(60, "That last name is a little too long."),
    email: z.email("Please enter a valid email address.").max(200),
    jobCategory: z.string(),
    details: z.string().trim().optional(),
    message: z
      .string()
      .trim()
      .min(10, "Please add a short message so I know how to help.")
      .max(5000, "That message is a little too long."),
  })
  .refine(
    (data) => data.jobCategory !== "other" || (data.details?.length ?? 0) > 0,
    {
      message: "Please add some details about what you need.",
      path: ["details"],
    },
  );

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-keyed error map produced by z.flattenError. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;

/** Discriminated union returned by the Server Action and consumed by the form. */
export type ContactState =
  | { ok: true }
  | { ok: false; errors: ContactFieldErrors; formError?: string };

/** Initial state for useActionState (no submission yet). */
export const contactInitialState: ContactState = {
  ok: false,
  errors: {},
};
