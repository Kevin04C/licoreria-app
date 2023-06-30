import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
  const saltRound = bcrypt.genSaltSync()
  const passwordEncrypted = bcrypt.hashSync(password, saltRound)
  return passwordEncrypted
}
