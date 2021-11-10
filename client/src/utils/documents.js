const pipe = (value, ...funcs) => funcs.reduce((res, func) => func(res), value);
const Master = (d) => (d.id?.toUpperCase() === 'MASTER' ? { rid: '마스터', rgen: '' } : d);
const Manager = (d) => (d.id?.toUpperCase() === 'MANAGER' ? { rid: '운영진', rgen: '' } : d);
const Camper = (d) => (d.id ? { rid: d.id.toUpperCase(), rgen: `${d.gen}기` } : d);

export const docTitleGen = ({ generation = 0, name = '', boostcampId = '', boostcampID = '' }, type) => {
  const id = boostcampId || boostcampID;
  const gen = generation;
  const { rid, rgen } = pipe({ id, gen }, Master, Manager, Camper);
  const genId = rgen === '' ? `${rid}` : `${rgen} ${rid}`;
  const rname = name;

  let result = `${rname} (${genId})`;
  if (type === 1) {
    result = `${genId} ${rname}`;
  }
  return result;
};
