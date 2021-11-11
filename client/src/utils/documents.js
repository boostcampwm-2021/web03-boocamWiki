const boostcampIdMap = {
  master: '마스터',
  manager: '운영진',
};

export const docTitleGen = ({ generation = 0, name = '', boostcampId = '', boostcampID = '' }, type) => {
  const id = boostcampId || boostcampID;
  const rid = boostcampIdMap[id] ?? id;
  const rgen = generation === 0 ? '' : `${generation}기`;
  const info = [rid, rgen].filter((el) => el !== '').join(' ');

  if (type === 1) {
    return info !== '' ? `${info} ${name}` : name;
  }
  return info !== '' ? `${name} (${info})` : name;
};
