export const UPLOAD_STATUS = {
  DEFAULT: 'DEFAULT',
  SUCCESS: 'SUCCESS',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
};

export const STATUS_ICON = {
  [UPLOAD_STATUS.DEFAULT]: 'cloud upload',
  [UPLOAD_STATUS.SUCCESS]: 'thumbs up outline',
  [UPLOAD_STATUS.ERROR]: 'thumbs down outline',
};