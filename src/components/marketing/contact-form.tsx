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
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      company: "",
      email: "",
      message: "",
      name: "",
    },
  });

  function onSubmit() {
    setStatus("Thanks. Your project details are ready for review.");
    reset();
  }

  return (
    <form className="rounded-xl border border-border bg-card p-6 shadow-soft" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input aria-invalid={Boolean(errors.name)} id="name" {...register("name")} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input aria-invalid={Boolean(errors.email)} id="email" type="email" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Input id="company" {...register("company")} />
        </Field>
        <Field data-invalid={Boolean(errors.message)}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea aria-invalid={Boolean(errors.message)} id="message" rows={5} {...register("message")} />
          <FieldError errors={[errors.message]} />
        </Field>
        <Button disabled={isSubmitting} type="submit">
          Submit Project Details
        </Button>
        {status ? <p className="text-sm leading-6 text-muted-foreground">{status}</p> : null}
      </FieldGroup>
    </form>
  );
}
