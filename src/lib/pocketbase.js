import PocketBase from 'pocketbase';

// Replace this with your PocketBase server URL
const url = 'https://ceo-bd-ferreteria.ei9yfj.easypanel.host/';

export const pb = new PocketBase(url);

// Disable auto cancellation for testing
pb.autoCancellation(false);
