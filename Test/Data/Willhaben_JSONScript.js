var Willhaben;
(function (Willhaben)
{
  "use strict"

  Willhaben.getData = function()
  {
    var _jsonData = JSON.parse(_jsonString, reviver);
    return _jsonData;
  
      function reviver(key, value)
      {
        if (typeof(key) == "undefined" || key === null)
        {
          return value;
        }//END if
  
        if (value === "null")
        {
          return null;
        }//END if
  
        if (value == "true")
        {
          return true;
        }//END if
  
        if (value === "false")
        {
          return false;
        }//END if
  
        if (!isNaN(Number(value)))
        {
          return Number(value);
        }//END if
  
        return value;
      }
  
  }

  var _jsonString = '{"vendor":[{"name":"willhaben","services":{"service":[{"name":"remoteapi","environments":{"environment":[{"name":"custom","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://api-custom.willhaben.at/restapi/v2"},{"major":"2","minor":"0","rootUri":"http://api-custom.willhaben.at/restapi/v2"}]}},{"name":"dev","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://api-dev.willhaben.at/restapi/v1"},{"major":"2","minor":"0","rootUri":"http://api-dev.willhaben.at/restapi/v2"}]}},{"name":"localhost","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://localhost:8080/restapi/v1"},{"major":"2","minor":"0","rootUri":"http://localhost:8080/restapi/v2"}]}},{"name":"prod","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://api.willhaben.at/restapi/v2"},{"major":"2","minor":"0","rootUri":"http://api.willhaben.at/restapi/v2"}]}},{"name":"st","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://api-st.willhaben.at/restapi/v2"},{"major":"2","minor":"0","rootUri":"http://api-st.willhaben.at/restapi/v2"}]}},{"name":"uat","versions":{"version":[{"major":"1","minor":"0","rootUri":"http://api-uat.willhaben.at/restapi/v2"},{"major":"2","minor":"0","rootUri":"http://api-uat.willhaben.at/restapi/v2"}]}}]}}]}}]}';


})(Willhaben || (Willhaben= {}));