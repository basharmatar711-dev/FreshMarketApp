/** Joins class names, skipping falsy values. Swap for `clsx` if your project already uses it. */
export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')
