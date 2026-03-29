// ============================================================================
// Theme helper - consistent class names for degen styling
// ============================================================================

export const theme = {
  // Card styles
  card: {
    sticker: 'sticker-card p-4',
    stickerLime: 'sticker-card-lime p-4',
    stickerPink: 'sticker-card-pink p-4',
    window: 'window-card',
    terminal: 'terminal-block',
  },

  // Text styles
  text: {
    marker: 'font-marker',
    terminal: 'font-terminal',
    highlight: 'marker-highlight',
    highlightPink: 'marker-highlight-pink',
    highlightCyan: 'marker-highlight-cyan',
    scribble: 'scribble',
  },

  // Button styles
  button: {
    primary:
      'inline-flex items-center gap-2 px-5 py-2.5 font-terminal text-lg bg-lime-400 text-zinc-900 border-2 border-lime-300 hover-glow-lime transition-all hover:bg-lime-300 active:translate-y-0.5',
    secondary:
      'inline-flex items-center gap-2 px-5 py-2.5 font-terminal text-lg bg-transparent text-lime-400 border-2 border-lime-400/50 hover:border-lime-400 hover:bg-lime-400/10 transition-all active:translate-y-0.5',
    ghost:
      'inline-flex items-center gap-2 px-3 py-1.5 font-terminal text-sm text-zinc-400 hover:text-lime-400 transition-colors',
    degen:
      'inline-flex items-center gap-2 px-5 py-2.5 font-marker text-lg bg-pink-500 text-white border-2 border-pink-400 hover-glow-pink hover-wiggle transition-all active:translate-y-0.5',
  },

  // Link styles
  link: {
    degen: 'degen-link',
    subtle: 'text-zinc-400 hover:text-lime-400 underline underline-offset-2 transition-colors',
  },

  // Rotation for handmade feel
  rotate: {
    cw: 'rotate-slight-cw',
    ccw: 'rotate-slight-ccw',
    moreCw: 'rotate-more-cw',
    moreCcw: 'rotate-more-ccw',
  },

  // Borders
  border: {
    sketchy: 'border-sketchy',
    double: 'border-double-offset',
  },

  // Effects
  effect: {
    wiggle: 'hover-wiggle',
    glowLime: 'hover-glow-lime',
    glowPink: 'hover-glow-pink',
  },
} as const

// Window card wrapper helper
export function windowCard(title: string) {
  return {
    container: 'window-card overflow-hidden',
    titlebar: 'window-titlebar',
    titleText: 'window-titlebar-text',
    title,
    content: 'p-4',
  }
}
