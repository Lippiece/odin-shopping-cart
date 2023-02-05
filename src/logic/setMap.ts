const setMap = (set: Set<any>, callback: (value: any) => any) =>
  new Set([ ...set ].map(callback));

export default setMap;
