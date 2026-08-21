// OpenTelemetry tracing configuration for CareerPilot-AI
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME, ATTR_DEPLOYMENT_ENVIRONMENT } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const exporter = new OTLPTraceExporter({
  // AI Toolkit OTLP HTTP endpoint
  url: 'http://localhost:4318/v1/traces',
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'careerpilot-ai',
    [ATTR_DEPLOYMENT_ENVIRONMENT]: 'development',
  }),
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  console.log('[tracing] OpenTelemetry SDK started - traces will be sent to http://localhost:4318');
} catch (error) {
  console.error('[tracing] Error starting OpenTelemetry SDK', error);
}

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('[tracing] SDK shut down'))
    .catch((error) => console.error('[tracing] Error during shutdown', error))
    .finally(() => process.exit(0));
});
