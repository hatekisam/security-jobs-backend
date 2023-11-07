export const TokenTypeEnum = ['PASSWORD_RESET', 'VERIFY_EMAIL'] as const
export type TokenType = (typeof TokenTypeEnum)[number]
