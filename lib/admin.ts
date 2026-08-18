export const ADMIN_EMAILS = ['kristupasl13@gmail.com']

export function isAdmin(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email)
}
