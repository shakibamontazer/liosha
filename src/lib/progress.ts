import { LAUNCH_ITEMS } from "@/lib/catalog";
import type { Project } from "@/lib/types";

export const STEP_COUNT = 11;

export function stepDone(project: Project, step: number) {
  switch (step) {
    case 0:
      return (
        project.ideaThread.some((m) => m.role === "ai") &&
        project.clearGoal.trim().length > 8
      );
    case 1:
      return (
        project.skillsHard.length > 0 &&
        project.skillsSoft.length > 0 &&
        project.frictions.length > 0 &&
        Boolean(project.niche.service.trim()) &&
        Boolean(project.niche.audience.trim()) &&
        Boolean(project.niche.outcome.trim()) &&
        project.beta.filter((b) => b.name.trim()).length >= 3
      );
    case 2:
      return project.selectedName.trim().length > 1;
    case 3:
      return (
        Object.values(project.canvas).filter((v) => v.trim().length > 3).length >= 6
      );
    case 4:
      return (
        project.budget > 0 &&
        project.capex.some((l) => l.amount > 0) &&
        project.opex.some((l) => l.amount > 0)
      );
    case 5:
      return (
        project.packages.every((p) => p.name.trim() && p.price > 0) &&
        Boolean(project.adjective) &&
        Boolean(project.funnel.attract.trim()) &&
        Boolean(project.funnel.trust.trim()) &&
        Boolean(project.funnel.sell.trim())
      );
    case 6:
      return Boolean(project.paletteId && project.fontPair && project.tone);
    case 7:
      return (
        project.briefQuestions.filter((q) => q.trim()).length >= 3 &&
        project.revisionLimit > 0
      );
    case 8:
      return LAUNCH_ITEMS.every((item) => project.checklist[item.id]);
    case 9:
      return project.concerns.some((c) => c.answer.trim());
    case 10:
      return Boolean(
        project.persona.name.trim() &&
          project.persona.pains.trim() &&
          project.persona.tone.trim()
      );
    default:
      return false;
  }
}

export function completedSteps(project: Project) {
  return Array.from({ length: STEP_COUNT }, (_, i) => i).filter((step) =>
    stepDone(project, step)
  );
}

export function progressOf(project: Project) {
  return Math.round((completedSteps(project).length / STEP_COUNT) * 100);
}

export function nextStep(project: Project) {
  for (let i = 0; i < STEP_COUNT; i += 1) {
    if (!stepDone(project, i)) return i;
  }
  return STEP_COUNT - 1;
}

export function sumLines(lines: { amount: number }[]) {
  return lines.reduce((total, line) => total + (Number(line.amount) || 0), 0);
}
