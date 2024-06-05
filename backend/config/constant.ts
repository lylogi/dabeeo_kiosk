export enum TYPE_SITE {
  TRANSPORT,
  BUILDING,
}

export enum TYPE_MAP {
  MALL,
  OFFICE,
  BUILDING,
}

export enum TYPE_SCREEN {
  ALL = 0,
  MAIN_SCREEN = 1,
  SAVER_SCREEN = 2,
}

export enum TYPE_EVENT {
  PROMOTION = 'promotion',
  COUPON = 'event',
}

export enum Role {
  SITE = 'site',
  BRANCH = 'branch',
}

export enum TYPE_MENU {
  HIDDEN,
  DISPLAY,
}

export enum TYPE_FILE {
  IMAGE = 0,
  VIDEO = 2,
}

/*send logs to admin every hour from 10ham to 8hpm when server on */
export const INTERVAL_SEND_LOGS = '0 */59 10-20 * * *';

export const TIME_SEND_LOGS = {
  'FL-7dV6I4tjO3219': '20/30  9-23 * * *', //5F
  'FL-ziQ3RKtohg3838': '20/30 9-23 * * *', //4F
  'FL-PKTf7H2oLJ3486': '15/30 9-23 * * *', //3F
  'FL-Q7b9m8Ly73110': '10/30  9-23 * * *', //2F
  'FL-oQ33DFwJk8835': '5/30  9-23 * * *', //1F
  'FL-2RgrriDiE1221': '5/30  9-23 * * *', //B1F
};

export const HASH_KEY = 'kiosk';

export const TEMPLATE_JSON_ERROR = {
  data: [],
};
