import {
  appConfig,
  isFedEx,
  isUPS,
  isUSPS,
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
  linkTag.href = appConfig.greenCheckmarkImageUrl;
  window.document.title = `📦 DELIVERED | ${window.document.title}`;
  document.getElementsByTagName('head')[0].appendChild(linkTag);
};

const initExtension = () => {
  let deliveryStatus = null;
  const timerHandle = setInterval(reloadWindow, appConfig.reloadInterval);
  if (isFedEx()) {
    const doFedEx = () => {
      const fedExDeliveryStatusEl = document.querySelector(appConfig.fedExDeliverySelector);
      deliveryStatus = fedExDeliveryStatusEl.innerText.trim().toLowerCase();
      console.log('deliveryStatus: ', deliveryStatus);
      if (deliveryStatus === 'delivered') {
        updateDelivered();
      }
    };
    // fedex does rendering post load and elements aren't available
    setTimeout(doFedEx, 5000);
  }
  if (isUSPS()) {
    const uspsDeliveryStatusEl = document.querySelector(appConfig.uspsDeliverySelector);
    deliveryStatus = uspsDeliveryStatusEl.innerText.trim().toLowerCase();
  }
  if (isUPS()) {
    const upsDeliveryStatusEl = document.querySelector(appConfig.upsDeliverySelector);
    deliveryStatus = upsDeliveryStatusEl.innerText.trim().toLowerCase();
  }
  if (deliveryStatus === 'delivered') {
    updateDelivered();
    clearInterval(timerHandle);
  }
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    initExtension();
  }
};
