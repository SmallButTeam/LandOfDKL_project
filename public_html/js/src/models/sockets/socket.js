/**
 * Created by rikimaru on 18.03.15.
 */

define(
    [
        "backbone",
        "config"
    ], function(Backbone, Config) {

    function onEvent(event) {
        var data = JSON.parse(event.data);
        this.trigger(data.action, data);
    }

    function onError(msg) {
        this.trigger("error", msg);
    }

    function onClose(msg) {
        this.trigger("closed", msg);
    }

    return new (Backbone.Model.extend({

        connection : null,

        initialize : function(options) {

            this.connect(options.address);
            this.connection.onopen = function() {
                console.log("Socket connect success");
            };
            this.connection.onmessage = onEvent.bind(this);
            this.connection.onerror = onError.bind(this);
            this.connection.onclose = onClose.bind(this);
        },

        connect : function(address) {
            this.connection = new WebSocket(address);
            if (this.connection.readyState != 4) {
                this.trigger("connect_error");
            }
        },

        send : function(msg) {
            this.connection.send(msg);
        },

        close : function() {
            this.connection.close();
        }

    }))({address : Config.socketChatUrl});

});