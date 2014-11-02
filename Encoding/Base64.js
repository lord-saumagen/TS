var TS;
(function (TS) {
    "use strict";

    (function (Encoding) {
        var Base64 = (function () {
            function Base64() {
            }
            Base64.decode = function (data) {
                var _octetData0;
                var _octetData1;
                var _octetData2;
                var _charIndex0;
                var _charIndex1;
                var _charIndex2;
                var _charIndex3;
                var _index;
                var _bits;
                var _result;

                if (TS.Utils.TypeInfo.isNullUndefOrEmpty(data)) {
                    return "";
                }

                if (!TS.Utils.TypeInfo.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.decode' must be a valid string.");
                }

                _index = 0;
                _result = "";

                do {
                    _charIndex0 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
                    _charIndex1 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
                    _charIndex2 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));
                    _charIndex3 = this.BASE64_CHARACTER_SET.indexOf(data.charAt(_index++));

                    _bits = _charIndex0 << 18 | _charIndex1 << 12 | _charIndex2 << 6 | _charIndex3;

                    _octetData0 = _bits >>> 16;
                    _octetData1 = _bits >> 8 & 0xff;
                    _octetData2 = _bits & 0xff;

                    if (_charIndex2 == 64) {
                        _result += String.fromCharCode(_octetData0);
                    } else if (_charIndex3 == 64) {
                        _result += String.fromCharCode(_octetData0, _octetData1);
                    } else {
                        _result += String.fromCharCode(_octetData0, _octetData1, _octetData2);
                    }
                } while(_index < data.length);

                return _result;
            };

            Base64.encode = function (data) {
                var _octetData0;
                var _octetData1;
                var _octetData2;
                var _charIndex0;
                var _charIndex1;
                var _charIndex2;
                var _charIndex3;
                var _index;
                var _bits;
                var _padding;
                var _result;
                var _data;

                if (TS.Utils.TypeInfo.isNullUndefOrEmpty(data)) {
                    return "";
                }

                if (!TS.Utils.TypeInfo.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Utils.Base64.encode' must be a valid string.");
                }

                _index = 0;
                _result = "";

                do {
                    _octetData0 = data.charCodeAt(_index++);
                    _octetData1 = data.charCodeAt(_index++);
                    _octetData2 = data.charCodeAt(_index++);

                    _bits = _octetData0 << 16 | _octetData1 << 8 | _octetData2;

                    _charIndex0 = _bits >>> 18;
                    _charIndex1 = _bits >> 12 & 0x3f;
                    _charIndex2 = _bits >> 6 & 0x3f;
                    _charIndex3 = _bits & 0x3f;

                    _result += this.BASE64_CHARACTER_SET.charAt(_charIndex0) + this.BASE64_CHARACTER_SET.charAt(_charIndex1) + this.BASE64_CHARACTER_SET.charAt(_charIndex2) + this.BASE64_CHARACTER_SET.charAt(_charIndex3);
                } while(_index < data.length);

                _padding = data.length % 3;

                return (_padding ? _result.slice(0, _padding - 3) : _result) + '==='.slice(_padding || 3);
            };
            Base64.BASE64_CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            return Base64;
        })();
        Encoding.Base64 = Base64;
    })(TS.Encoding || (TS.Encoding = {}));
    var Encoding = TS.Encoding;
})(TS || (TS = {}));
