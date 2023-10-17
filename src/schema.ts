import { z } from 'zod';

export const ColorEnum = z.enum(["red", "green", "blue"]);
export type IColorEnum = z.infer<typeof ColorEnum>;

export const SizeEnum = z.enum(["xs", "s", "md", "l", "xl"]);
export type ISizeEnum = z.infer<typeof SizeEnum>;

