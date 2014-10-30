var Get_USStateList;
(function (Get_USStateList)
{
  "use strict"

  Get_USStateList.getData = function()
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

  var _jsonString = '[{"name":"Alaska","abbreviation":"AK","countyList":[]},{"name":"Arizona","abbreviation":"AZ","countyList":[]},{"name":"Arkansas","abbreviation":"AR","countyList":[]},{"name":"California","abbreviation":"CA","countyList":[]},{"name":"Colorado","abbreviation":"CO","countyList":[]},{"name":"Connecticut","abbreviation":"CT","countyList":[]},{"name":"Delaware","abbreviation":"DE","countyList":[]},{"name":"District Of Columbia","abbreviation":"DC","countyList":[]},{"name":"Florida","abbreviation":"FL","countyList":[]},{"name":"Georgia","abbreviation":"GA","countyList":[]},{"name":"Hawaii","abbreviation":"HI","countyList":[]},{"name":"Idaho","abbreviation":"ID","countyList":[]},{"name":"Illinois","abbreviation":"IL","countyList":[]},{"name":"Indiana","abbreviation":"IN","countyList":[]},{"name":"Iowa","abbreviation":"IA","countyList":[]},{"name":"Kansas","abbreviation":"KS","countyList":[]},{"name":"Kentucky","abbreviation":"KY","countyList":[]},{"name":"Louisiana","abbreviation":"LA","countyList":[]},{"name":"Maine","abbreviation":"ME","countyList":[]},{"name":"Maryland","abbreviation":"MD","countyList":[]},{"name":"Massachusetts","abbreviation":"MA","countyList":[]},{"name":"Michigan","abbreviation":"MI","countyList":[]},{"name":"Minnesota","abbreviation":"MN","countyList":[]},{"name":"Mississippi","abbreviation":"MS","countyList":[]},{"name":"Missouri","abbreviation":"MO","countyList":[]},{"name":"Montana","abbreviation":"MT","countyList":[]},{"name":"Nebraska","abbreviation":"NE","countyList":[]},{"name":"Nevada","abbreviation":"NV","countyList":[]},{"name":"New Hampshire","abbreviation":"NH","countyList":[]},{"name":"New Jersey","abbreviation":"NJ","countyList":[]},{"name":"New Mexico","abbreviation":"NM","countyList":[]},{"name":"New York","abbreviation":"NY","countyList":[]},{"name":"North Carolina","abbreviation":"NC","countyList":[]},{"name":"North Dakota","abbreviation":"ND","countyList":[]},{"name":"Ohio","abbreviation":"OH","countyList":[]},{"name":"Oklahoma","abbreviation":"OK","countyList":[]},{"name":"Oregon","abbreviation":"OR","countyList":[]},{"name":"Pennsylvania","abbreviation":"PA","countyList":[]},{"name":"Rhode Island","abbreviation":"RI","countyList":[]},{"name":"South Carolina","abbreviation":"SC","countyList":[]},{"name":"South Dakota","abbreviation":"SD","countyList":[]},{"name":"Tennessee","abbreviation":"TN","countyList":[]},{"name":"Texas","abbreviation":"TX","countyList":[]},{"name":"Utah","abbreviation":"UT","countyList":[]},{"name":"Vermont","abbreviation":"VT","countyList":[]},{"name":"Virginia","abbreviation":"VA","countyList":[]},{"name":"Washington","abbreviation":"WA","countyList":[]},{"name":"West Virginia","abbreviation":"WV","countyList":[]},{"name":"Wisconsin","abbreviation":"WI","countyList":[]},{"name":"Wyoming","abbreviation":"WY","countyList":[]}]';


})(Get_USStateList || (Get_USStateList= {}));