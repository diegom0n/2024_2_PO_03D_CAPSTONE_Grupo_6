import { initStripe } from '@stripe/stripe-react-native';

const PUBLISHABLE_KEY = 'pk_test_51N75MIGD6rvnwVkTDi2rwCqgzXzroP7Osg6FjbznpuZyFqCTKrhtYpDYjuXvCm1AqhFSFfuFpo5CunviTZnyH52K00HWd3jwyP';

export function initializeStripe() {
  initStripe({
    publishableKey: PUBLISHABLE_KEY,
  });
}
