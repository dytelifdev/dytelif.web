"use client";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { FieldError as RHFFieldError, UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "./turnstile";

/** The asterisk after a required field's label; the field itself carries aria-required. */
export function RequiredMark() {
  return (
    <span aria-hidden="true" className="-ml-1 text-brand">
      *
    </span>
  );
}

/** "* ile işaretli alanlar zorunludur." line that opens each form. */
export function RequiredNote() {
  return (
    <p className="text-sm text-ink-soft">
      <RequiredMark /> ile işaretli alanların doldurulması zorunludur.
    </p>
  );
}

/**
 * Groups Turkish phone numbers while typing: 0533 016 72 78, 533 016 72 78 or
 * +90 533 016 72 78. Deleting is left alone so the cursor can move back over spaces.
 */
export function formatPhone(raw: string) {
  const international = raw.trimStart().startsWith("+");
  const digits = raw.replace(/\D/g, "");
  if (international) {
    const d = digits.slice(0, 12);
    const rest = d.slice(2);
    return (
      [`+${d.slice(0, 2)}`, rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 8), rest.slice(8, 10)]
        .filter((part) => part && part !== "+")
        .join(" ") || "+"
    );
  }
  const d = digits.slice(0, 11);
  const cuts = d.startsWith("0") ? [0, 4, 7, 9, 11] : [0, 3, 6, 8, 10];
  return cuts
    .slice(0, -1)
    .map((start, i) => d.slice(start, cuts[i + 1]))
    .filter(Boolean)
    .join(" ");
}

type TextFieldProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: RHFFieldError;
  registration: UseFormRegisterReturn;
  required?: boolean;
  /** Format the value as a phone number while typing. */
  phone?: boolean;
} & Omit<ComponentProps<"input">, "id" | "required">;

export function TextField({ id, label, hint, error, registration, required, phone, ...inputProps }: TextFieldProps) {
  const onChange = phone
    ? (event: React.ChangeEvent<HTMLInputElement>) => {
        const native = event.nativeEvent as InputEvent | undefined;
        if (!native?.inputType?.startsWith("delete")) event.target.value = formatPhone(event.target.value);
        return registration.onChange(event);
      }
    : registration.onChange;
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <RequiredMark /> : null}
      </FieldLabel>
      <Input
        id={id}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...registration}
        onChange={onChange}
        {...inputProps}
      />
      {hint ? <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription> : null}
      <FieldError errors={[error]} />
    </Field>
  );
}

export function MessageField({
  id,
  label,
  hint,
  error,
  registration,
  rows = 5,
  required,
  maxLength,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: RHFFieldError;
  registration: UseFormRegisterReturn;
  rows?: number;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <RequiredMark /> : null}
      </FieldLabel>
      <Textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...registration}
      />
      {hint ? <FieldDescription id={`${id}-hint`}>{hint}</FieldDescription> : null}
      <FieldError errors={[error]} />
    </Field>
  );
}

/** Off-screen field that only bots fill in. */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label>
        Web siteniz
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

export const consentLabel = (
  <>
    Bilgilerimin yalnızca bu talebe dönüş yapılması için kullanılmasını kabul ediyorum.{" "}
    <Link href="/kvkk" className="font-semibold text-brand underline underline-offset-2">
      KVKK Aydınlatma Metni
    </Link>
  </>
);

export function FormFooter({
  siteKey,
  onToken,
  resetKey,
  submitting,
  unavailable,
  children,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  resetKey: number;
  submitting: boolean;
  unavailable: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      {siteKey ? <Turnstile siteKey={siteKey} onToken={onToken} resetKey={resetKey} /> : null}
      {unavailable ? (
        <p role="status" className="rounded-lg bg-cream px-4 py-3 text-sm">
          Form şu anda yapılandırılıyor. Bu sırada WhatsApp&apos;tan yazabilirsiniz.
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={submitting || unavailable} className="self-start">
        {submitting ? "Gönderiliyor…" : children}
      </Button>
    </div>
  );
}

export function SentNotice({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <div role="status" className="rounded-2xl bg-brand-soft p-6 sm:p-8">
      <span className="grid size-12 place-items-center rounded-full bg-brand text-white">
        <CheckIcon className="size-6" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <p className="mt-5 text-2xl leading-tight font-bold">{title}</p>
      <p className="mt-3 max-w-md text-ink-soft">{body}</p>
      <Button type="button" variant="outline" className="mt-6" onClick={onReset}>
        Yeni bir mesaj yazın
      </Button>
    </div>
  );
}
