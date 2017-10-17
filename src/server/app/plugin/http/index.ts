export const httpPlugin: any  = {

    components: __dirname + '/lib/components/',

    events: __dirname + '/lib/events/',

    beforeFilters: [],
    afterFilters: [],

    filter (filter: any) {
        if (filter.before) {
            this.beforeFilters.push(filter.before.bind(filter));
        }
        if (filter.after) {
            this.afterFilters.push(filter.after.bind(filter));
        }
    },

    beforeFilter (filter: any) {
        this.beforeFilters.push(filter);
    },

    afterFilter (filter: any) {
        this.afterFilters.push(filter);
    },

};
