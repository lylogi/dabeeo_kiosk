export const EndPoints = {
  machine: 'machine',
  screens: 'screens',
  sync: 'sync',
  menus: 'menus',
  floors: 'floors',
  pois: 'pois',
  poisByMapId: 'pois/idmap',
  categories: 'categories',
  tags: 'tags',
  events: 'events',
  logs: 'logs'
} as const;

export type EndPointType = typeof EndPoints[keyof typeof EndPoints];
