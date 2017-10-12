import * as Redis from 'ioredis';

// redis 入参
export interface RedisDbConfig{
    port?: number;
    host?: string;
    family?: number;
    password?: string;
    db?: number;
}

export class RedisClient {
    constructor (cfg ?: RedisDbConfig) {
        if (!cfg || !cfg.port) cfg.port = 6379;
        return Redis(cfg);
    }
}
