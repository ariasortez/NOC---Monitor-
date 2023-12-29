import { ServerApp as Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  Server.start();
}
