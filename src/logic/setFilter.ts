const setFilter = (set: Set, callback: (value: any) => boolean): Set =>
  new Set([ ...set ].filter(callback));

export default setFilter;
