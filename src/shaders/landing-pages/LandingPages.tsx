import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
  type TypographyDefaults,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
export { LandingPageFrame, type LandingPageProps };

const COMPLETE_SHELF_TYPOGRAPHY: TypographyDefaults = {
  headingVar: "--serif",
  bodyVar: "--sans",
  monoVar: "--mono",
  accentVar: "--ink",
};

/** The byte-exact Working Volumes page, as registered in the ThreeUI bundle. */
export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Working Volumes — Seven Tools for Making" sourceUrl="/landing-pages/complete-shelf-v2.html" />;
}

/**
 * Derived variant of the complete shelf: same authored scene, shaders, motion
 * and interface, with the seven volumes rewritten as Tushar Yadav's résumé,
 * a portrait slot, and a résumé download.
 */
export function ResumeShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Tushar Yadav — Résumé" sourceUrl="/landing-pages/tushar-yadav-resume.html" />;
}
