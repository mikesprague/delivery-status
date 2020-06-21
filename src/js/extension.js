import '../scss/styles.scss';
import {
  appConfig,
  currentService,
  handleError,
  initOverlay,
  reloadWindow,
  sendDeliveryNotiication,
} from './modules/helpers';

const updateDelivered = () => {
  const linkTags = Array.from(document.querySelectorAll("link[rel*='icon']"));
  linkTags.forEach(link => {
    link.remove();
  });
  const linkTag = document.createElement('link');
  linkTag.type = 'image/png';
  linkTag.rel = 'shortcut icon';
  linkTag.href = appConfig.favicons.delivered;
  window.document.title = `${appConfig.titlePrefix.delivered} | ${window.document.title}`;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
};

const updateOutForDelivery = () => {
  const linkTags = Array.from(document.querySelectorAll("link[rel*='icon']"));
  linkTags.forEach(link => {
    link.remove();
  });
  const linkTag = document.createElement('link');
  linkTag.type = 'image/png';
  linkTag.rel = 'shortcut icon';
  linkTag.href = appConfig.favicons.outForDelivery;
  window.document.title = `${appConfig.titlePrefix.outForDelivery} | ${window.document.title}`;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
};

const updateInTransit = () => {
  const linkTags = Array.from(document.querySelectorAll("link[rel*='icon']"));
  linkTags.forEach(link => {
    link.remove();
  });
  const linkTag = document.createElement('link');
  linkTag.type = 'image/png';
  linkTag.rel = 'shortcut icon';
  linkTag.href = appConfig.favicons.inTransit;
  window.document.title = `${appConfig.titlePrefix.inTransit} | ${window.document.title}`;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
};

const initExtension = () => {
  const clockTimerHandle = initOverlay();
  const extensionOverlayEl = document.querySelector('#extension-overlay');
  extensionOverlayEl.classList.add('hidden');
  const deliveryService = currentService();
  let deliveryStatus = null;
  try {
    const doChecks = () => {
      switch (deliveryService) {
        case ('fedex'): {
          const fedExDeliveryStatusEl = document.querySelector(appConfig.selectors.fedEx);
          deliveryStatus = fedExDeliveryStatusEl.textContent.trim().toLowerCase();
          break;
        }
        case ('usps'): {
          const uspsDeliveryStatusEl = document.querySelector(appConfig.selectors.usps);
          deliveryStatus = uspsDeliveryStatusEl.textContent.trim().toLowerCase();
          break;
        }
        case ('ups'): {
          const upsDeliveryStatusEl = document.getElementById(appConfig.selectors.ups);
          deliveryStatus = upsDeliveryStatusEl.textContent.trim().toLowerCase();
          break;
        }
        case ('lasership'): {
          const lasershipDeliveryStatusEl = document.querySelector(appConfig.selectors.lasership);
          deliveryStatus = lasershipDeliveryStatusEl.textContent.trim().toLowerCase();
          break;
        }
        default: {
          // should never get here
          console.log('Oops... something went wrong.');
          console.log('deliveryService: ', deliveryService);
          break;
        }
      };
      extensionOverlayEl.classList.remove('hidden');
      const statusImage = document.querySelector('.delivery-status-icon');
      const statusText = document.querySelector('.delivery-status-text');
      appConfig.statusStrings.delivered.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          sendDeliveryNotiication();
          statusImage.src = appConfig.favicons.delivered;
          statusText.classList.add('delivered');
          statusText.textContent = 'Delivered';
          clearInterval(clockTimerHandle);
          document.querySelector('#extension-overlay h3').remove();
          updateDelivered();
        }
      });
      appConfig.statusStrings.outForDelivery.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          statusImage.src = appConfig.favicons.outForDelivery;
          statusText.classList.add('out-for-delivery');
          statusText.textContent = 'Out for Delivery';
          updateOutForDelivery();
        }
      });
      appConfig.statusStrings.inTransit.forEach(statusString => {
        if (deliveryStatus.includes(statusString)) {
          statusImage.src = appConfig.favicons.inTransit;
          statusText.classList.add('in-transit');
          statusText.textContent = 'In Transit';
          updateInTransit();
        }
      });
    };
    setTimeout(doChecks, 5000);
  } catch (error) {
    handleError(error, clockTimerHandle);
  }
};

// - [x] stop reload (clearInterval) on error
// - [x] add overlay with:
//   - [x] absolute positioned and semi-transparent
//   - [x] reload countdown timer
// - [ ] add build steps to readme
// - [ ] take screenshots and create graphic for dev dashboard
// - [ ] release in chrome store
// - [ ] release in mozilla add-ons

document.onreadystatechange = () => {
  Notification.requestPermission().then((result) => {
    console.log(result);
  });
  if (document.readyState === 'complete') {
    initExtension();
  }
};
