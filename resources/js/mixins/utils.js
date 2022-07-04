import Vue from "vue";

const utilsMixin = {
    methods: {
        getInitialName(string) {
            const initialArray = string.toString().split(" ");
            const initials = initialArray.map(letter => {
                return letter.substr(0, 1).toString();
            });
            return initials.join("");
        }
    }
};

Vue.mixin(utilsMixin);
