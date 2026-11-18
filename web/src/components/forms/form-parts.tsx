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

type TextFieldProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: RHFFieldError;
  registration: UseFormRegisterReturn;
} & Omit<ComponentProps<"input">, "id">;

export function TextField({ id, label, hint, error, registration, ...inputProps }: TextFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...registration}
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
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: RHFFieldError;
  registration: UseFormRegisterReturn;
  rows?: number;
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        rows={rows}
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
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
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
    <Link href="/iletisim#kisisel-veriler" className="underline">
      Ayrıntılar
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
        <p role="status" className="border-t-2 border-ink pt-3 text-sm">
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
    <div role="status" className="border-t-2 border-ink pt-6">
      <CheckIcon className="size-8 text-folder" strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-4 font-display text-3xl leading-tight">{title}</p>
      <p className="mt-3 max-w-md text-ink-soft">{body}</p>
      <Button type="button" variant="link" className="mt-6" onClick={onReset}>
        Yeni bir mesaj yazın
      </Button>
    </div>
  );
}
