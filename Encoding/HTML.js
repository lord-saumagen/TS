var TS;
(function (TS) {
    "use strict";

    (function (Encoding) {
        var HTML = (function () {
            function HTML() {
            }
            HTML.encode = function (stringValue) {
                var _bufferArray = [];
                var _index;
                var _length;

                _length = stringValue.length;
                for (_index = 0; _index < length; _index++) {
                    _bufferArray.push('&#' + stringValue.charCodeAt(_index) + ';');
                }
                return _bufferArray.join('');
            };

            HTML.decode = function (stringValue) {
                return stringValue.replace(/&#(\d+);/g, function (match, dec) {
                    return String.fromCharCode(dec);
                });
            };
            return HTML;
        })();
        Encoding.HTML = HTML;
    })(TS.Encoding || (TS.Encoding = {}));
    var Encoding = TS.Encoding;
})(TS || (TS = {}));
