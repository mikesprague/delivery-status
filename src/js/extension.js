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
      settings.statusStrings.delivered.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          sendDeliveryNotification();
          clearInterval(clockTimerHandle);
          updateOverlayStatus('delivered');
          updateDeliveryStatus('delivered');
        }
      });
      settings.statusStrings.outForDelivery.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          updateOverlayStatus('outForDelivery');
          updateDeliveryStatus('outForDelivery');
        }
      });
      settings.statusStrings.inTransit.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          updateOverlayStatus('inTransit');
          updateDeliveryStatus('inTransit');
        }
      });
    };
    setTimeout(doChecks, 5000);
  } catch (error) {
    handleError(error, clockTimerHandle);
  }
};

initNotificationPermissionCheck();
initExtension();
