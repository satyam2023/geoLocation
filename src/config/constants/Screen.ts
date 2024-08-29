export const SCREENS={
    HOME:'Home'
} as const

export type ScreenNames = typeof SCREENS[keyof typeof SCREENS];