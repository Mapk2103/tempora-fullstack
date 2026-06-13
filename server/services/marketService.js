const http = require('http');
const https = require('https');

const DEFAULT_GOLD_API_URL = 'https://api.gold-api.com/price/XAU';
const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_CACHE_TTL_MS = 30 * 1000;
const DEFAULT_FALLBACK_PRICE_USD = 3389.3;
const FALLBACK_CACHE_TTL_MS = 60 * 1000;
const MAX_RESPONSE_BYTES = 1024 * 1024;

let goldCache = null;

const getPositiveNumber = (value, fallback) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
};

const requestJson = (url, timeoutMs) => new Promise((resolve, reject) => {
  const parsedUrl = new URL(url);
  const transport = parsedUrl.protocol === 'http:' ? http : https;

  const request = transport.get(
    parsedUrl,
    {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Tempora/1.0'
      }
    },
    (response) => {
      let body = '';
      let receivedBytes = 0;

      response.setEncoding('utf8');

      response.on('data', (chunk) => {
        receivedBytes += Buffer.byteLength(chunk);

        if (receivedBytes > MAX_RESPONSE_BYTES) {
          request.destroy(new Error('La respuesta del proveedor es demasiado grande'));
          return;
        }

        body += chunk;
      });

      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`El proveedor respondio con estado ${response.statusCode}`));
          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error('El proveedor devolvio una respuesta invalida'));
        }
      });
    }
  );

  request.setTimeout(timeoutMs, () => {
    request.destroy(new Error('Tiempo de espera agotado al consultar el precio del oro'));
  });

  request.on('error', reject);
});

const createFallbackQuote = () => ({
  symbol: 'XAU',
  currency: 'USD',
  price: getPositiveNumber(
    process.env.GOLD_FALLBACK_PRICE_USD,
    DEFAULT_FALLBACK_PRICE_USD
  ),
  updatedAt: new Date().toISOString(),
  source: 'fallback',
  isFallback: true
});

const getGoldQuote = async ({ forceRefresh = false } = {}) => {
  const now = Date.now();

  if (!forceRefresh && goldCache && goldCache.expiresAt > now) {
    return {
      ...goldCache.quote,
      cached: true
    };
  }

  const apiUrl = process.env.GOLD_API_URL || DEFAULT_GOLD_API_URL;
  const timeoutMs = getPositiveNumber(
    process.env.GOLD_REQUEST_TIMEOUT_MS,
    DEFAULT_TIMEOUT_MS
  );
  const cacheTtlMs = getPositiveNumber(
    process.env.GOLD_CACHE_TTL_MS,
    DEFAULT_CACHE_TTL_MS
  );

  try {
    const data = await requestJson(apiUrl, timeoutMs);
    const price = Number(data.price);

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error('El proveedor devolvio un precio invalido');
    }

    const quote = {
      symbol: data.symbol || 'XAU',
      currency: data.currency || 'USD',
      price,
      updatedAt: data.updatedAt || new Date().toISOString(),
      source: 'gold-api.com',
      isFallback: false
    };

    goldCache = {
      quote,
      expiresAt: now + cacheTtlMs
    };

    return {
      ...quote,
      cached: false
    };
  } catch (error) {
    console.warn(`Precio del oro no disponible: ${error.message}. Usando respaldo.`);

    const quote = createFallbackQuote();

    goldCache = {
      quote,
      expiresAt: now + Math.min(cacheTtlMs, FALLBACK_CACHE_TTL_MS)
    };

    return {
      ...quote,
      cached: false
    };
  }
};

module.exports = {
  getGoldQuote
};
