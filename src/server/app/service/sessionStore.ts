import * as Redis from 'ioredis';
import * as events from 'events';
import * as util from 'util';
import * as Logger from 'pomelo-logger';
// import * as Promise from 'bluebird';

const logger = Logger.getLogger('session', __filename);

// redis 入参
export interface RedisDbConfig{
    port?: number;
    host?: string;
    family?: number;
    password?: string;
    db?: number;
    keyPrefix?: string;
}

/**
 * Session Redis Store For SessionService
 *
 * by default,session will store in memory,but when system restart, all
 * session will destroy,then all online user must connect again.
 * Add this store to sessionService,it will work when session create update destroy,
 * then all the connectors servers will share the session data
 * @param {Object} opts constructor parameters
 * @class RedisSessionStore
 * @constructor
 */
export default class RedisSessionStore {
    private redis: Redis.Redis;
    private emit: Function;
    private on: Function;
    private setName: string = 'online';

    constructor (opt?: RedisDbConfig) {
        events.EventEmitter.call(this);

        const host = opt.host || '127.0.0.1';
        const port = opt.port || 6379;
        const family = opt.family || 4;
        const password = opt.password || '';
        const db = opt.db || 0;
        const keyPrefix = opt.keyPrefix || 'session';

        this.redis = new Redis({ host, port, family, password, db, keyPrefix });

        // bind some events
        this.redis.on('error', this.emit.bind(this, 'error'));
        this.redis.on('connect', this.emit.bind(this, 'connect'));
        this.redis.on('reconnecting', this.emit.bind(this, 'reconnecting'));
        this.redis.on('ready', this.emit.bind(this, 'ready'));
        this.redis.on('close', this.emit.bind(this, 'close'));

        this.on('connect', () => {
            logger.debug('connected to redis');
        });

        this.on('error', () => {
            logger.debug('redis error');
        });

        this.on('reconnecting', () => {
            logger.debug('redis reconnecting');
        });

        this.on('ready', () => {
            logger.debug('redis ready');
        });

        this.on('close', () => {
            logger.debug('redis close');
        });
    }

    /**
     * get session from redis by sid
     * @param sid 
     */
    public async get (sid: string): Promise<object> {
        return this.redis.hgetall(sid);
    }

    /**
     * get all sessions in redis
     */
    public async getAll (): Promise<object[]> {
        const sids = await this.redis.smembers(this.setName);
        const sessions = sids.map((sid: string) => this.redis.hgetall(sid));
        return Promise.all(sessions);
    }

    /**
     * create (if not exit) or update a session
     * @param session 
     */
    public async set (sid: string, session: object) {
        await this.redis.hmset(sid, session);
        await this.redis.sadd(this.setName, sid);
    }

    /**
     * destroy a session from redis by sid
     * @param sid 
     */

    public async destroy (sid: string) {
        await this.redis.del(sid);
        await this.redis.srem(this.setName, sid);
    }

    /**
     * destroy all sessions from redis
     */
    public async destroyAll () {
        const sids = await this.redis.smembers(this.setName);
        const destroys = sids.map((sid: string) => this.redis.del(sid));
        await Promise.all(destroys);
        await this.redis.del(this.setName);
    }

}

util.inherits(RedisSessionStore, events.EventEmitter);
