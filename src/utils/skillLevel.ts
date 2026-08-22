export interface SkillLevelBand {
  min: number;
  max: number;
  labelKey: string;
}

/** Przedziały poziomu umiejętności (0-100), wzorem skal na portalach typu justjoin.it. */
export const SKILL_LEVEL_BANDS: SkillLevelBand[] = [
  { min: 0, max: 24, labelKey: "tools.skillLevel.beginner" },
  { min: 25, max: 49, labelKey: "tools.skillLevel.intermediate" },
  { min: 50, max: 74, labelKey: "tools.skillLevel.advanced" },
  { min: 75, max: 89, labelKey: "tools.skillLevel.veryGood" },
  { min: 90, max: 100, labelKey: "tools.skillLevel.expert" },
];

export function getSkillLevelBand(progress: number | null | undefined): SkillLevelBand | null {
  if (progress === null || progress === undefined || Number.isNaN(progress)) return null;
  return (
    SKILL_LEVEL_BANDS.find((band) => progress >= band.min && progress <= band.max) ??
    SKILL_LEVEL_BANDS[SKILL_LEVEL_BANDS.length - 1]
  );
}
