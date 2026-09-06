import { useMemo } from "react";

/**
 * Typography and colour overrides appended to a loaded landing-page document.
 * The packaged HTML stays byte-exact on disk; these are injected at runtime.
 */
export type LandingPageCustomization = {
  headingFont?: string;
  bodyFont?: string;
  monoFont?: string;
  accentColor?: string;
  css?: string;
};

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  monoFont?: string;
  accentColor?: string;
};

const TYPOGRAPHY_KEYS = ["headingFont", "bodyFont", "monoFont", "accentColor"] as const;

export function splitTypographyProps<T extends PageTypographyProps>(
  props: T,
): [PageTypographyProps, Omit<T, keyof PageTypographyProps>] {
  const type: PageTypographyProps = {};
  const rest: Record<string, unknown> = { ...props };
  for (const key of TYPOGRAPHY_KEYS) {
    if (key in rest) {
      (type as Record<string, unknown>)[key] = rest[key];
      delete rest[key];
    }
  }
  return [type, rest as Omit<T, keyof PageTypographyProps>];
}

export type TypographyDefaults = {
  headingVar?: string;
  bodyVar?: string;
  monoVar?: string;
  accentVar?: string;
};

export function usePageTypography(
  defaults: TypographyDefaults,
  type: PageTypographyProps,
): LandingPageCustomization | undefined {
  return useMemo(() => {
    const declarations: string[] = [];
    if (type.headingFont && defaults.headingVar) declarations.push(`${defaults.headingVar}: ${type.headingFont};`);
    if (type.bodyFont && defaults.bodyVar) declarations.push(`${defaults.bodyVar}: ${type.bodyFont};`);
    if (type.monoFont && defaults.monoVar) declarations.push(`${defaults.monoVar}: ${type.monoFont};`);
    if (type.accentColor && defaults.accentVar) declarations.push(`${defaults.accentVar}: ${type.accentColor};`);
    if (declarations.length === 0) return undefined;
    return { ...type, css: `:root{${declarations.join("")}}` };
  }, [defaults, type.headingFont, type.bodyFont, type.monoFont, type.accentColor]);
}

const CUSTOMIZATION_STYLE_ID = "threeui-page-customization";

export function applyPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization,
) {
  const document = frame?.contentDocument;
  if (!document) return;
  document.getElementById(CUSTOMIZATION_STYLE_ID)?.remove();
  if (!customization?.css) return;
  const style = document.createElement("style");
  style.id = CUSTOMIZATION_STYLE_ID;
  style.textContent = customization.css;
  document.head.appendChild(style);
}

export function postPageCustomization(
  frame: HTMLIFrameElement | null,
  customization?: LandingPageCustomization,
) {
  if (!frame?.contentWindow || !customization) return;
  try {
    frame.contentWindow.postMessage({ type: "threeui:customization", customization }, "*");
  } catch {
    /* cross-origin frames ignore customization */
  }
}
