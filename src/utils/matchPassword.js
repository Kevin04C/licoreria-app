import bcrypt from 'bcrypt'

export const matchPassword = (password, passwordEncrypted) => {
  const match = bcrypt.compareSync(password, passwordEncrypted)
  return match
}
