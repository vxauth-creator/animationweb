/**
 * Cross-cutting type primitives.
 */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/** Polymorphic component prop helper — for primitives like `<Section as="article">`. */
export type AsProp<T extends ElementType> = { as?: T };

export type PolymorphicProps<T extends ElementType, P = object> = P &
  AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof P | "as">;

/** Standard children-only props. */
export type WithChildren<P = object> = P & { children?: ReactNode };

/** Brand a primitive type to avoid accidental cross-assignment. */
export type Brand<T, B extends string> = T & { readonly __brand: B };

export type Slug = Brand<string, "Slug">;
export type Iso8601 = Brand<string, "Iso8601">;

/** Tier returned by `useDevicePerfTier`. Drives rendering decisions. */
export type PerfTier = "low" | "medium" | "high";

/** Auth roles — referenced ahead of Phase 4 wire-up. */
export type Role = "admin" | "editor" | "client";
