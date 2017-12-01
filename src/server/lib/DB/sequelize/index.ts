import * as Sequelize from 'sequelize';
export interface SequeDbConfig {
    database: string;
    username: string;
    password: string;
    options: {
        host: string;
        dialect: string;
        pool?: {
            max: number;
            min: number;
            idle: number
        }
    };
}

export class SequeClient {
    private sequelize: Sequelize.Sequelize;
    private dataTypes: object;
    private sync: Function;
    private definModel: Function;

    constructor (cfg: SequeDbConfig) {
        this.sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg.options);
        this.dataTypes = Sequelize;
        this.sync = () => {
            if (process.env.NODE_ENV !== 'production') {
                return this.sequelize.sync({ force: true });
            }
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        };
        this.definModel = (name: string, attributes: any, options: any) => {
            const attrs: any = {};
            for (const key in attributes) {
                const value = attributes[key];
                if (typeof value === 'object' && value['type']) {
                    value.allowNull = value.allowNull || true;
                    attrs[key] = value;
                } else {
                    attrs[key] = {
                        type: value,
                        allowNull: false,
                    };
                }
                // 自定义 Object Array
                if (typeof value === 'object' && value['cast']) {
                    if (value['cast'] === 'Object') {
                        attrs[key].get = function () {
                            const val = this.getDataValue(key);
                            if (!val) return {};
                            return JSON.parse(val);
                        };
                        attrs[key].set = function (val: any) {
                            const value = JSON.stringify(val);
                            this.setDataValue(key, value);
                        };
                    }
                    if (value['cast'] === 'Array') {
                        attrs[key].get = function () {
                            const val = this.getDataValue(key);
                            if (!val) return [];
                            return JSON.parse(val);
                        };
                        attrs[key].set = function (val: any) {
                            const value = JSON.stringify(val);
                            this.setDataValue(key, value);
                        };
                    }
                }
            }
            const defaultOptions = {
                tableName: name,
                timestamps: false,
                freezeTableName: true,
                underscored: true,
                hooks: {
                    beforeValidate (obj: any) {
                        const now = Date.now();
                        if (obj.isNewRecord) {
                            obj.createdAt = now;
                            obj.updatedAt = now;
                            obj.version = 0;
                        } else {
                            obj.updatedAt = now;
                        }
                    },
                },
            };
            const overrideOptions = Object.assign({}, defaultOptions, options);
            overrideOptions.hooks.beforeValidate = defaultOptions.hooks.beforeValidate;
            return this.sequelize.define(name, attrs, overrideOptions);
        };
    }
}
