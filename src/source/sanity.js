const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'r7xgkr2j',
  dataset: 'production',
  useCdn: false
});

export default client;