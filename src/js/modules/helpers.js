import dayjs from 'dayjs';

export const appConfig = {
  favicons: {
    delivered: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/delivered.png',
    inTransit: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/in-transit.png',
    outForDelivery: 'https://raw.githubusercontent.com/mikesprague/delivery-status/master/src/images/out-for-delivery.png',
  },
  statusStrings: {
    delivered: ['delivered'],
    inTransit: ['in transit', 'on its way', 'in-transit'],
    outForDelivery: ['out for delivery'],
  },
  titlePrefix: {
    delivered: 'DELIVERED ',
    inTransit: 'In Transit',
    outForDelivery: 'Out For Delivery',
  },
  reloadInterval: 300000, // 5 minutes ((1000 * 60) * 5)
  selectors: {
    fedEx: '.snapshotController_addr_label.dest',
    ups: 'stApp_txtPackageStatus',
    usps: 'div.delivery_status > h2',
    lasership: '.event-banner-on',
  },
};

export function handleError(error, timerHandle = null) {
  if (timerHandle) {
    clearInterval(timerHandle);
  }
  console.error(error);
}

export function initOverlay() {
  const overlayMarkup = `
    <div class="extension-overlay">
      <h2><img class="delivery-status-icon">&nbsp;<span class="delivery-status-text"></span></h2>
      <h3>Page will reload in <span class="time-remaining">5:00</span></h3>
    </div>
  `;
  document.querySelector('.iw_viewport-wrapper').insertAdjacentHTML('afterend', overlayMarkup);
  const timeNow = dayjs();
  const timeToReload = dayjs(timeNow).add(appConfig.reloadInterval, 'millisecond');
  const updateTimer = () => {
    const timeRemaining = dayjs(timeToReload).diff(dayjs());
    document.querySelector('.time-remaining').textContent = dayjs(timeRemaining).format('m:ss');
    // console.log();
  };
  const clockTimerHandle = setInterval(updateTimer, 500);
  return clockTimerHandle;
}

export function reloadWindow() {
  window.location.reload(true);
};

export function currentService() {
  const domains = ['fedex.com', 'ups.com', 'usps.com', 'lasership.com'];
  let returnVal = null;
  domains.forEach(domain => {
    if (window.location.hostname.includes(domain)) {
      [returnVal, ] = domain.split('.');
    }
  });
  return returnVal;
}
