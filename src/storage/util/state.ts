export interface InformationObject {
  error: string;
  information: string;
}

export interface NotificationBox {
  information: string | null;
  class: boolean | null;
  offNotification: boolean;
}

export interface UtilState {
  loadingSpinner: boolean;
  navigationAdmin: boolean;
  informationObject: InformationObject | null;
  notificationBox: NotificationBox;
}

export function state(): UtilState {
  return {
    loadingSpinner: false,
    navigationAdmin: true,
    informationObject: null,
    notificationBox: {
      information: null,
      class: null,
      offNotification: false,
    },
  };
}
