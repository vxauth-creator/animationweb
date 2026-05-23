"use client";

import { create } from "zustand";

/**
 * Global UI store.
 *
 * Holds cross-cutting UI flags that need to be observable from disparate parts
 * of the tree without prop-drilling: nav menu state, command-palette open
 * state, scene-loading flag (toggled by Phase 2's R3F scene), and a
 * lightweight "modal-open" counter that other systems (Lenis) can observe to
 * pause inertial scroll while overlays are visible.
 *
 * Keep this store *thin*. Domain state belongs in TanStack Query or feature-
 * scoped stores; this is for ephemeral UI only.
 */

interface UiState {
  navOpen: boolean;
  commandOpen: boolean;
  sceneLoaded: boolean;
  /** Number of open modals/sheets. Lenis can read this to pause smooth scroll. */
  modalDepth: number;

  setNavOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
  setSceneLoaded: (loaded: boolean) => void;

  pushModal: () => void;
  popModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  navOpen: false,
  commandOpen: false,
  sceneLoaded: false,
  modalDepth: 0,

  setNavOpen: (open) => set({ navOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  setSceneLoaded: (loaded) => set({ sceneLoaded: loaded }),

  pushModal: () => set((s) => ({ modalDepth: s.modalDepth + 1 })),
  popModal: () => set((s) => ({ modalDepth: Math.max(0, s.modalDepth - 1) })),
}));

/** Convenience selector — true when any modal/sheet is currently open. */
export const useModalOpen = (): boolean => useUiStore((s) => s.modalDepth > 0);
