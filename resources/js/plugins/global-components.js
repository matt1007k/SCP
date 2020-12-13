import Vue from "vue";

Vue.component(
    "page-header",
    require("../components/custom/PageHeader.vue").default
);
Vue.component(
    "modal-header",
    require("../components/custom/modal/ModalHeader.vue").default
);
Vue.component("card", require("../components/custom/Card.vue").default);
Vue.component(
    "data-table",
    require("../components/custom/DataTable.vue").default
);
Vue.component(
    "btn-secondary",
    require("../components/custom/BtnSecondary.vue").default
);
