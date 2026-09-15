import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Identifiant de l'emplacement, à remplacer par l'image finale. */
  id: string;
  ratio?: string;
  className?: string;
}

/**
 * PLACEHOLDER IMAGE — à remplacer.
 * Chaque emplacement est identifié par son `id` pour retrouver
 * facilement où déposer les visuels définitifs.
 */
const ImagePlaceholder = ({ id, ratio = "4 / 5", className }: ImagePlaceholderProps) => (
  <div
    data-placeholder={id}
    style={{ aspectRatio: ratio }}
    className={cn(
      "relative w-full overflow-hidden rounded-2xl border border-dashed border-border/70 bg-card/40",
      "flex flex-col items-center justify-center gap-2 text-center px-4",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--primary)/0.08),transparent_70%)]" />
    <ImageIcon className="relative w-6 h-6 text-primary/60" />
    <span className="relative text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {id}
    </span>
  </div>
);

export default ImagePlaceholder;
