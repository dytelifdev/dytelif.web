"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { contactSchema, type ContactInput } from "@/lib/inquiry";
import { consentLabel, FormFooter, Honeypot, MessageField, RequiredNote, SentNotice, TextField } from "./form-parts";
import { useInquirySubmit } from "./use-inquiry-submit";

const defaults: ContactInput = {
  kind: "contact",
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const { submit, sent, setSent, setToken, resetKey, turnstileSiteKey, formUnavailable } = useInquirySubmit();
  const form = useForm<ContactInput, unknown, z.output<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { errors, isSubmitting } = form.formState;

  if (sent) {
    return (
      <SentNotice
        title="Mesajınız iletildi."
        body="En kısa sürede size dönüş yapılacak. Acil bir durum için WhatsApp'tan da yazabilirsiniz."
        onReset={() => setSent(false)}
      />
    );
  }

  return (
    <form
      noValidate
      className="relative"
      onSubmit={form.handleSubmit(async (values) => {
        if (await submit(values)) form.reset(defaults);
      })}
    >
      <FieldGroup>
        <RequiredNote />
        <TextField
          id="contact-name"
          label="Ad soyad"
          required
          maxLength={80}
          autoComplete="name"
          error={errors.name}
          registration={form.register("name")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="contact-email"
            label="E-posta"
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={120}
            placeholder="ornek@eposta.com"
            error={errors.email}
            registration={form.register("email")}
          />
          <TextField
            id="contact-phone"
            label="Telefon"
            required
            phone
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={17}
            placeholder="0533 000 00 00"
            error={errors.phone}
            registration={form.register("phone")}
          />
        </div>
        <MessageField
          id="contact-message"
          label="Mesajınız"
          required
          maxLength={1500}
          error={errors.message}
          registration={form.register("message")}
        />
        <Controller
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="contact-consent"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <div className="grid gap-1.5">
                <FieldLabel htmlFor="contact-consent" className="leading-snug font-normal">
                  {consentLabel}
                </FieldLabel>
                <FieldError errors={[fieldState.error]} />
              </div>
            </Field>
          )}
        />
        <Honeypot registration={form.register("website")} />
        <FormFooter
          siteKey={turnstileSiteKey}
          onToken={setToken}
          resetKey={resetKey}
          submitting={isSubmitting}
          unavailable={formUnavailable}
        >
          Mesajı gönder
        </FormFooter>
      </FieldGroup>
    </form>
  );
}
