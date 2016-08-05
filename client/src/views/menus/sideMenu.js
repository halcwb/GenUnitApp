/**
 * Created by halcwb on 05/08/16.
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'menu';

    exports.init = function (app) {

        webix.ui(
            {
                id: id,
                view: 'sidemenu',
                width: 200,
                position: 'left',
                state: function(state) {
                    var headerHeight = $$('header').$height;
                    state.top = headerHeight;
                    state.height -= headerHeight;
                },
                body: {
                    view: 'list',
                    borderless: true,
                    scroll: false,
                    template: "<span class='webix_icon fa-#icon#'></span> #setting#: #value#",
                    data: [
                        { id: 1, icon: 'cog', setting: 'server', value: '' }
                    ],
                    on: {
                        'onItemClick': function (id, e, trg) {
                            app.bus.view.publish('sidemenu.itemclick', {
                                id: id
                            });
                        }
                    }
                }
            }
        );

        app.bus.controller.subscribe('*.status', function () {
            var status = app.settings.demo ? 'demo' : 'online';
            $$(id).getBody().updateItem(1, { value: status });
        });


    };

})();