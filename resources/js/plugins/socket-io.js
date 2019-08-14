import Vue from "vue";
import VueSocketio from "vue-socket.io";
import socketio from "socket.io-client";

export const SocketInstance = socketio.connect("http://127.0.0.1:6999");

Vue.use(
    new VueSocketio({
        debug: true,
        connection: SocketInstance
    })
);
