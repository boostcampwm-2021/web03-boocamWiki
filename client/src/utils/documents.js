const boostcampIdMap = {
  master: '마스터',
  manager: '운영진',
};

export const docTitleGen = ({ generation = 0, name = '', boostcampId }, type) => {
  const id = boostcampId ?? '';
  const rid = boostcampIdMap[id] ?? (id !== '' ? id : '');
  const rgen = Number(generation) === 0 ? '' : `${generation}기`;
  const info = [rgen, rid].filter((el) => el !== '').join(' ');

  if (type === 1) {
    return info !== '' ? `${info} ${name}` : name;
  }
  return info !== '' ? `${name} (${info})` : name;
};
