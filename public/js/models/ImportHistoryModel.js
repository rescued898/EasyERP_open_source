define([
    'Backbone',
    'Underscore',
    'constants',
    'moment'
], function (Backbone, _, CONSTANTS, moment) {
    'use strict';

    var ImportHistoryModel = Backbone.Model.extend({
        idAttribute: '_id',
        initialize : function () {
            this.on('invalid', function (model, errors) {
                var msg;

                if (errors.length > 0) {
                    msg = errors.join('\n');

                    App.render({
                        type   : 'error',
                        message: msg
                    });
                }
            });
        },

        parse: function(res) {
            if (!res.data) {
                if (res.date) {
                    res.date = moment(res.date).format('DD MMM, YYYY, H:mm:ss');
                }
            }
            return res;
        },

        defaults: {
            date: '',
            fileName: '',
            user: '',
            status: '',
            reportFile: ''
        },

        urlRoot: function () {
            return CONSTANTS.URLS.IMPORT_HISTORY;
        }
    });
    return ImportHistoryModel;
});
