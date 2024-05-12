import * as bcrypt from 'bcryptjs';

const saltRounds = 15;

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
