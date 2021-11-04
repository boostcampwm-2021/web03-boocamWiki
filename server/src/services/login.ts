import * as bcrypt from 'bcrypt';

export const encodePassword = async (id) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const pw = await bcrypt.hash(id, salt);
  return pw;
};
