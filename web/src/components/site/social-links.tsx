import type { ComponentType, SVGProps } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons/brand-icons";
import type { Contact } from "@/lib/contact";
import { SOCIAL_LABELS, type SocialNetwork } from "@/lib/site";
import { cn } from "@/lib/utils";

export const SOCIAL_ICONS: Record<SocialNetwork, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  x: XIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

/** Optical sizes: outline marks need a little more room than solid ones to look equal. */
const ICON_SIZE: Record<SocialNetwork, string> = {
  instagram: "size-[1.15rem]",
  x: "size-4",
  facebook: "size-[1.15rem]",
  linkedin: "size-4",
  tiktok: "size-[1.15rem]",
  youtube: "size-5",
};

/**
 * Social accounts as icons: links once their address is in Studio. `variant` sets the
 * look: bare icons for the top bar, filled circles for the footer and pages.
 */
export function SocialLinks({
  socials,
  variant = "circle",
  className,
}: {
  socials: Contact["socials"];
  variant?: "bare" | "circle" | "circle-dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center", variant === "bare" ? "gap-0.5" : "gap-2.5", className)}>
      {socials.map(({ network, url }) => {
        const Icon = SOCIAL_ICONS[network];
        // Same circle, same hover for every mark, linked or not yet linked.
        const look = cn(
          "grid size-11 place-items-center rounded-full transition-[background-color,color,translate] duration-200",
          variant === "bare" && "text-white/90 hover:bg-white/15 hover:text-white",
          variant === "circle" && "bg-brand-soft text-brand hover:-translate-y-0.5 hover:bg-brand hover:text-white",
          variant === "circle-dark" && "bg-white/10 text-white hover:-translate-y-0.5 hover:bg-paper hover:text-deep",
        );
        const icon = <Icon className={ICON_SIZE[network]} />;
        return (
          <li key={network}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SOCIAL_LABELS[network]} (yeni sekmede açılır)`}
                className={look}
              >
                {icon}
              </a>
            ) : (
              // Account not entered in Studio yet: the mark shows, without a dead link.
              <span aria-hidden="true" className={look}>
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
