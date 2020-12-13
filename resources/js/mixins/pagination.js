import Vue from "vue";

const paginationMixin = {
    methods: {
        getPaginateElement(data) {
            const unallowed = ["data"];
            const pagination = Object.keys(data)
                .filter(key => !unallowed.includes(key))
                .reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: data[key]
                    };
                }, {});
            return pagination;
        }
    }
};

Vue.mixin(paginationMixin);
