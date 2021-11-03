import loaders, {dbLoader} from './loaders';
import * as express from 'express';
import config from './config'

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });
  await dbLoader({});

  app.listen(config.PORT, () => {
    console.log(`✅ Your server is ready !`);
  });
}

startServer();
