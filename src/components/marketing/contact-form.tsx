"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Share a short project or business challenge."),
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      company: "",
      email: "",
      message: "",
      name: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const response = await fetch("/api/contact", { body: JSON.stringify(values), headers: { "Content-Type": "application/json" }, method: "POST" });
    if (!response.ok) {
      setStatus((await response.json().catch(() => null))?.error ?? "Please try again in a few minutes.");
      return;
    }
    const body = `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "Not provided"}\n\n${values.message}`;
    window.location.href = `mailto:bracketdex@gmail.com?subject=${encodeURIComponent("Project enquiry from " + values.name)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => { window.location.href = "/thank-you"; }, 500);
  }

  return (
    <form
      aria-describedby="contact-form-description"
      className="rounded-xl border border-border bg-card p-6 shadow-soft"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="mb-6 text-sm text-muted-foreground" id="contact-form-description">
        Share your requirement below. This opens a draft in your email app; nothing is sent automatically.
      </p>
      <FieldGroup>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden"><label htmlFor="website">Website</label><Input autoComplete="off" id="website" tabIndex={-1} {...register("website")} /></div>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" id="name" {...register("name")} />
          <FieldError errors={[errors.name]} id="name-error" />
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input aria-describedby={errors.email ? "email-error" : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" id="email" type="email" {...register("email")} />
          <FieldError errors={[errors.email]} id="email-error" />
        </Field>
        <Field>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Input autoComplete="organization" id="company" {...register("company")} />
        </Field>
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea aria-describedby={errors.message ? "message-error" : undefined} aria-invalid={Boolean(errors.message)} id="message" rows={5} {...register("message")} />
          <FieldError errors={[errors.message]} id="message-error" />
        </Field>
        <Button aria-disabled={isSubmitting || undefined} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Preparing…" : "Prepare Email Enquiry"}
        </Button>
        {status ? (
          <p aria-live="polite" className="text-sm leading-6 text-muted-foreground" role="status">
            {status}
          </p>
        ) : null}
      </FieldGroup>
    </form>
  );
}
