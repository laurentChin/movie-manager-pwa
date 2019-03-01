export const HOME_PAGE = "/";
export const UPDATE_PAGE = (_, id) => `/movies/${id}/update`;

export const PERSIST_PREFIX = "persist";
export const PERSISTED_STORE_NAME = "movieManager";
export const PERSISTED_FULL_STORE_NAME = `${PERSIST_PREFIX}:${PERSISTED_STORE_NAME}`;
