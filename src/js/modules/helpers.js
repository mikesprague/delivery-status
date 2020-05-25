export const appConfig = {
  greenCheckmarkImageUrl: 'https://www.providesupport.com/blog/wp-content/uploads/2013/08/green-check-mark.png',
  reloadInterval: 60000, // 5 minutes ((1000 * 60) * 5)
  fedExDeliverySelector: '.snapshotController_addr_label.dest',
  uspsDeliverySelector: 'div.delivery_status > h2',
  upsDeliverySelector: '#stApp_txtPackageStatus',
};

export function handleError(error) {
  console.error(error);
}

export function reloadWindow() {
  window.location.reload(true);
};

export function isFedEx() {
  return window.location.hostname.includes('fedex.com');
}

export function isUPS() {
  return window.location.hostname.includes('ups.com');
}

export function isUSPS() {
  return window.location.hostname.includes('usps.com');
}
