import '../scss/styles.scss';

// - [ ] add build steps to readme
// - [ ] take screenshots and create graphic for dev dashboard
// - [ ] release in chrome store
// - [ ] release in mozilla add-ons
// - [ ] improve url patterns in manifest?

import {
  currentService,
  handleError,
  initNotificationPermissionCheck,
  initOverlay,
  sendDeliveryNotiication,
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
          sendDeliveryNotiication();
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

document.onreadystatechange = () => {
  initNotificationPermissionCheck();
  if (document.readyState === 'complete') {
    initExtension();
  }
};
