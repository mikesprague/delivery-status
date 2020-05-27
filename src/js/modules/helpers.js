export const appConfig = {
  favicons: {
    delivered: 'https://www.providesupport.com/blog/wp-content/uploads/2013/08/green-check-mark.png',
    inTransit: '',
    outForDelivery: '',
  },
  titlePrefix: {
    delivered: '📦 DELIVERED ',
    inTransit: '✈ In Transit',
    outForDelivery: '🚚 Out For Delivery',
  },
  reloadInterval: 300000, // 5 minutes ((1000 * 60) * 5)
  selectors: {
    fedEx: '.snapshotController_addr_label.dest',
    ups: '#stApp_txtPackageStatus',
    usps: 'div.delivery_status > h2',
  },
};

export function handleError(error) {
  console.error(error);
}

export function reloadWindow() {
  window.location.reload(true);
};

export function currentService() {
  const domains = ['fedex.com', 'ups.com', 'usps.com'];
  let returnVal = null;
  domains.forEach(domain => {
    if (window.location.hostname.includes(domain)) {
      [ returnVal, ] = domain.split('.');
    }
  });
  return returnVal;
}
