import pino from 'pino';

/// pino-pretty is currently wack when writing this, will update later when there are fixes
export const logger = pino({
    name: process.env.LOGGER_NAME,
    level: process.env.LOGGER_LEVEL || 'info',
    redact: ['*.password', '*.secret'],
    browser: { disabled: false },
    // transport:
    //     process.env.LOGGER_PRETTY === 'true'
    //         ? {
    //               target: 'pino-pretty',
    //               options: {
    //                   colorize: true,
    //               },
    //           }
    //         : undefined,
});

export const childLogger = (module: string) => logger.child({ module });
