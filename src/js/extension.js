import '../scss/styles.scss';

import {
  currentService,
  handleError,
  initNotificationPermissionCheck,
  initOverlay,
  sendDeliveryNotification,
  updateDeliveryStatus,
  updateOverlayStatus,
} from './modules/helpers';
import * as settings from './modules/settings';

const initExtension = () => {
  const clockTimerHandle = initOverlay();
  const extensionOverlayEl = document.querySelector('#extension-overlay');
  extensionOverlayEl.classList.add('hidden');
  const deliveryService = currentService();
  let deliveryStatus = null;
  try {
    const doChecks = () => {
      const deliveryStatusEl = document.querySelector(settings.selectors[deliveryService].deliveryStatus);
      deliveryStatus = deliveryStatusEl.textContent.trim().toLowerCase();
      extensionOverlayEl.classList.remove('hidden');
      const statuses = ['inTransit', 'outForDelivery', 'delivered'];
      statuses.forEach(status => {
        settings.statusStrings[status].forEach(statusString => {
          if (deliveryStatus.includes(statusString)) {
            if (status === 'delivered') {
              sendDeliveryNotification();
              clearInterval(clockTimerHandle);
            }
            updateOverlayStatus(status);
            updateDeliveryStatus(status);
          }
        });
      })
    };
    setTimeout(doChecks, 5000);
  } catch (error) {
    handleError(error, clockTimerHandle);
  }
};

initNotificationPermissionCheck();
initExtension();
