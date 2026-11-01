"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Use 120 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  company: z.string().trim().max(160, "Use 160 characters or fewer.").optional(),
  message: z.string().trim().min(10, "Share a short project or business challenge.").max(5000, "Use 5,000 characters or fewer."),
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps = {}) {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    getValues,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      company: "",
      email: "",
      message: "",
      name: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topics: Record<string, string> = {
      "software-development": "custom software development", "ai-solutions": "AI solutions",
      "business-automation": "business automation", "cloud-devops": "cloud and DevOps",
      "digital-growth": "digital growth", "project-brief": "a new project",
      "define-change": "improving a business workflow", "repeated-approvals": "simplifying repeated approvals",
    };
    const key = params.get("service") || params.get("topic") || params.get("scenario") || "";
    const project = caseStudies.find(study => study.name === params.get("project"));
    const opening = project ? `I'd like to discuss a project similar to ${project.name}.` : topics[key] ? `I'd like to discuss ${topics[key]}.` : "";
    if (opening && !getValues("message")) setValue("message", `${opening}\n\n`);
  }, [getValues, setValue]);

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setStatus("Enquiry delivery is unavailable. Please email us directly.");
      return;
    }
    try {
      const validation = await fetch("/api/contact", { body: JSON.stringify(values), headers: { "Content-Type": "application/json" }, method: "POST" });
      if (!validation.ok) {
        setStatus((await validation.json().catch(() => null))?.error ?? "Please try again in a few minutes.");
        return;
      }
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: accessKey, subject: "New BracketDex enquiry", from_name: "BracketDex website", name: values.name, email: values.email, company: values.company || "Not provided", message: values.message }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        setStatus("We could not send your enquiry. Please try again or email us directly.");
        return;
      }
      window.location.href = "/thank-you";
    } catch {
      setStatus("We could not send your enquiry. Please try again or email us directly.");
    }
  }

  return (
    <form
      aria-describedby="contact-form-description contact-privacy-note"
      className={cn("rounded-xl border border-border bg-card p-6 shadow-soft", className)}
      id="contact-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="mb-6 text-sm text-muted-foreground" id="contact-form-description">
        Share your requirement below and we’ll get back to you.
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
          <Textarea aria-describedby={errors.message ? "message-error" : undefined} aria-invalid={Boolean(errors.message)} id="message" rows={5} placeholder="What would you like to build or improve? Share your goals, current challenge, and any timeline." {...register("message")} />
          <FieldError errors={[errors.message]} id="message-error" />
        </Field>
        <p className="col-span-full text-sm leading-6" id="contact-privacy-note">We use your details to respond to your enquiry. Please avoid sharing passwords or sensitive information. <Link className="underline underline-offset-4" href="/privacy">Read our privacy policy</Link>.</p>
        <Button aria-disabled={isSubmitting || undefined} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Sending…" : "Send Enquiry"}
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
