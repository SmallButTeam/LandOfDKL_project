/**
 * Created by rikimaru on 10.04.15.
 */

define(
    [
        "backbone",
        "jquery-ui",
        "jquery",
        "models/game/card",
        "templates/card"
    ], function(Backbone, Ui, $, CardModel, CardTemplate) {

        return Backbone.View.extend({

            template : CardTemplate,
            type : "",
            placePosition : {},

            initialize : function(options) {
                var $htmlEl;

                if (!options.model) {
                    this.model = new CardModel({type : options.type});
                }
                this.type = this.model.get("type");

                $htmlEl = $(CardTemplate({
                    type : this.type,
                    title : this.model.get("title"),
                    effect : this.model.get("effect"),
                    description : this.model.get("description")
                }));

                this.setElement($htmlEl);

                this.$el.on("step", function(e) {
                    this.model.trigger("step");
                    this.$el.draggable("disable");
                }.bind(this));

                this.$el.draggable({

                    containment : "#game-area",

                    start : function(event, ui) {
                        var $elem = ui.helper;
                        var top = $elem.css("top");
                        top = (top === "auto") ? 0 : top;
                        var left = $elem.css("left");
                        left = (left === "auto") ? 0 : left;
                        this.placePosition = {
                            top : top,
                            left : left
                        };
                    }.bind(this),

                    stop : function(event, ui) {
                        var $elem = ui.helper;
                        if ($elem.attr("prepareToDrop") == 0 || $elem.attr("prepareToDrop") == undefined) {
                            $elem.animate({
                                top : this.placePosition.top,
                                left : this.placePosition.left
                            }, "fast");
                        }
                    }.bind(this)

                });
            }
        });
    }
);