import {
  appConfig,
  currentService,
  reloadWindow,
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

const initExtension = () => {
  const deliveryService = currentService();
  let deliveryStatus = null;
  const timerHandle = setInterval(reloadWindow, appConfig.reloadInterval);
  const doChecks = () => {
    switch(deliveryService) {
      case('fedex'): {
        const fedExDeliveryStatusEl = document.querySelector(appConfig.selectors.fedEx);
        deliveryStatus = fedExDeliveryStatusEl.innerText.trim().toLowerCase();
        break;
      }
      case('usps'): {
        const uspsDeliveryStatusEl = document.querySelector(appConfig.selectors.usps);
        deliveryStatus = uspsDeliveryStatusEl.innerText.trim().toLowerCase();
        break;
      }
      case('ups'): {
        const upsDeliveryStatusEl = document.getElementById(appConfig.selectors.ups);
        deliveryStatus = upsDeliveryStatusEl.innerText.trim().toLowerCase();
        break;
      }
      default: {
        // should never get here
        console.log('Oops... something went wrong.');
        console.log('deliveryService: ', deliveryService);
        break;
      }
    };
    if (deliveryStatus === 'delivered') {
      updateDelivered();
      clearInterval(timerHandle);
    }
    if (deliveryStatus === 'out for delivery' || deliveryStatus === 'out for delivery today') {
      updateOutForDelivery();
    }
  };
  setTimeout(doChecks, 5000);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    initExtension();
  }
};
