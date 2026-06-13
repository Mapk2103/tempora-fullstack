const dns = require('dns');

const DEFAULT_DNS_SERVERS = ['8.8.8.8', '1.1.1.1'];

const configureDns = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDisabled = process.env.USE_CUSTOM_DNS === 'false';

  if (isProduction || isDisabled) {
    return;
  }

  const servers = (process.env.DNS_SERVERS || DEFAULT_DNS_SERVERS.join(','))
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length > 0) {
    dns.setServers(servers);
    console.log('DNS personalizado habilitado para desarrollo local');
  }
};

module.exports = configureDns;
