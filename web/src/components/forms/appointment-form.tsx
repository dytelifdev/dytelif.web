"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  appointmentSchema,
  FORMAT_LABELS,
  NOT_SURE_SERVICE,
  PREFERRED_CHANNELS,
  type AppointmentInput,
} from "@/lib/inquiry";
import { consentLabel, FormFooter, Honeypot, MessageField, SentNotice, TextField } from "./form-parts";
import { useInquirySubmit } from "./use-inquiry-submit";

const defaults: AppointmentInput = {
  kind: "appointment",
  name: "",
  email: "",
  phone: "",
  service: "",
  format: "farketmez",
  preferredChannel: "whatsapp",
  message: "",
  consent: false,
  website: "",
};

function Choices<T extends string>({
  id,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  legend: string;
  options: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
  error?: { message?: string };
}) {
  return (
    <FieldSet data-invalid={!!error}>
      <FieldLegend variant="label">{legend}</FieldLegend>
      <RadioGroup value={value} onValueChange={(v) => onChange(v as T)} className="flex flex-wrap gap-x-6 gap-y-1">
        {(Object.entries(options) as [T, string][]).map(([key, label]) => (
          <Field key={key} orientation="horizontal" className="w-auto">
            <RadioGroupItem value={key} id={`${id}-${key}`} />
            <FieldLabel htmlFor={`${id}-${key}`} className="min-h-11 font-normal">
              {label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <FieldError errors={[error]} />
    </FieldSet>
  );
}

/** Appointment *request*: emails the dietitian, who confirms a time personally. */
export function AppointmentForm({ services }: { services: string[] }) {
  const { submit, sent, setSent, setToken, resetKey, turnstileSiteKey, formUnavailable } = useInquirySubmit();
  const form = useForm<AppointmentInput, unknown, z.output<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { errors, isSubmitting } = form.formState;
  const options = [...services, NOT_SURE_SERVICE];

  // A service page links here with ?hizmet=<title>; preselect it when it exists.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("hizmet");
    if (requested && services.includes(requested)) form.setValue("service", requested);
  }, [form, services]);

  if (sent) {
    return (
      <SentNotice
        title="Talebiniz alındı."
        body="Randevunuz henüz kesinleşmedi. Seçtiğiniz kanaldan size dönüş yapılacak ve uygun zamanı birlikte belirleyeceksiniz."
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
        <TextField
          id="appt-name"
          label="Ad soyad"
          autoComplete="name"
          error={errors.name}
          registration={form.register("name")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="appt-phone"
            label="Telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
            registration={form.register("phone")}
          />
          <TextField
            id="appt-email"
            label="E-posta"
            type="email"
            inputMode="email"
            autoComplete="email"
            error={errors.email}
            registration={form.register("email")}
          />
        </div>
        <Controller
          control={form.control}
          name="service"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="appt-service">Hizmet</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="appt-service"
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Bir hizmet seçin" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="format"
          render={({ field, fieldState }) => (
            <Choices
              id="appt-format"
              legend="Görüşme şekli"
              options={FORMAT_LABELS}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error}
            />
          )}
        />
        <Controller
          control={form.control}
          name="preferredChannel"
          render={({ field, fieldState }) => (
            <Choices
              id="appt-channel"
              legend="Size nasıl dönelim?"
              options={PREFERRED_CHANNELS}
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error}
            />
          )}
        />
        <MessageField
          id="appt-message"
          label="Not (isteğe bağlı)"
          hint="Size uygun gün ve saat aralıklarını yazabilirsiniz. Sağlık bilgilerinizi görüşmede konuşuruz."
          rows={3}
          error={errors.message}
          registration={form.register("message")}
        />
        <Controller
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="appt-consent"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
              />
              <div className="grid gap-1.5">
                <FieldLabel htmlFor="appt-consent" className="leading-snug font-normal">
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
          Randevu talebini gönder
        </FormFooter>
      </FieldGroup>
    </form>
  );
}
