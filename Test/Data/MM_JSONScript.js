var MM;
(function (MM)
{
  "use strict"

  MM.getData = function()
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

  var _jsonString = '[{"sf":"MMC","lfs":[{"lf":"mitomycin C","freq":"2283","since":"1975","vars":[{"lf":"mitomycin C","freq":"1742","since":"1975"},{"lf":"Mitomycin C","freq":"260","since":"1978"},{"lf":"mitomycin-C","freq":"208","since":"1975"},{"lf":"Mitomycin-C","freq":"42","since":"1978"},{"lf":"mitomycin-c","freq":"11","since":"1986"},{"lf":"mitomycin c","freq":"9","since":"1990"},{"lf":"mytomycin C","freq":"3","since":"1988"},{"lf":"plus mitomycin","freq":"3","since":"1990"},{"lf":"mytomycin-C","freq":"2","since":"1977"},{"lf":"mitomycine C","freq":"2","since":"2005"},{"lf":"Mytomycin-C","freq":"1","since":"2006"}]},{"lf":"migrating motor complex","freq":"253","since":"1979","vars":[{"lf":"migrating motor complex","freq":"214","since":"1979"},{"lf":"migrating motor complexes","freq":"23","since":"1984"},{"lf":"Migrating motor complex","freq":"6","since":"1989"},{"lf":"Migrating Motor Complex","freq":"4","since":"1991"},{"lf":"migratory motor complex","freq":"2","since":"1990"},{"lf":"migrating motor-complex","freq":"2","since":"1990"},{"lf":"Migratory Motor Complex","freq":"1","since":"1994"},{"lf":"migratory motor complexes","freq":"1","since":"2006"}]},{"lf":"migrating myoelectric complex","freq":"176","since":"1976","vars":[{"lf":"migrating myoelectric complex","freq":"121","since":"1976"},{"lf":"migrating myoelectric complexes","freq":"27","since":"1980"},{"lf":"migrating myoelectrical complex","freq":"19","since":"1985"},{"lf":"myoelectrical migrating complex","freq":"3","since":"2001"},{"lf":"Migrating myoelectric complexes","freq":"2","since":"1984"},{"lf":"migrating myoelectrical complexes","freq":"2","since":"2000"},{"lf":"myoelectric migrating complex","freq":"1","since":"1990"},{"lf":"Migrating myoelectric complex","freq":"1","since":"1990"}]},{"lf":"myelomeningocele","freq":"158","since":"1984","vars":[{"lf":"myelomeningocele","freq":"115","since":"1984"},{"lf":"meningomyelocele","freq":"29","since":"1985"},{"lf":"Myelomeningocele","freq":"9","since":"1985"},{"lf":"myelomeningoceles","freq":"3","since":"1992"},{"lf":"Meningomyelocele","freq":"2","since":"2007"}]},{"lf":"mucosal mast cells","freq":"158","since":"1981","vars":[{"lf":"mucosal mast cells","freq":"101","since":"1981"},{"lf":"mucosal mast cell","freq":"34","since":"1982"},{"lf":"Mucosal mast cell","freq":"9","since":"1985"},{"lf":"Mucosal mast cells","freq":"7","since":"1988"},{"lf":"mucosal-type mast cells","freq":"4","since":"1990"},{"lf":"mucosal type mast cells","freq":"2","since":"1999"},{"lf":"Mucosal-type mast cells","freq":"1","since":"2005"}]},{"lf":"methylmercury chloride","freq":"113","since":"1976","vars":[{"lf":"methylmercury chloride","freq":"51","since":"1976"},{"lf":"methylmercuric chloride","freq":"37","since":"1976"},{"lf":"methyl mercury chloride","freq":"9","since":"1985"},{"lf":"methyl mercuric chloride","freq":"9","since":"1976"},{"lf":"Methylmercury chloride","freq":"4","since":"1978"},{"lf":"Methylmercuric chloride","freq":"3","since":"1993"}]},{"lf":"Medicaid managed care","freq":"49","since":"1998","vars":[{"lf":"Medicaid managed care","freq":"29","since":"1998"},{"lf":"Medicare managed care","freq":"13","since":"2000"},{"lf":"Medicaid Managed Care","freq":"4","since":"2005"},{"lf":"Medicare Managed Care","freq":"3","since":"2002"}]},{"lf":"Muhimbili Medical Centre","freq":"26","since":"1986","vars":[{"lf":"Muhimbili Medical Centre","freq":"16","since":"1986"},{"lf":"Monash Medical Centre","freq":"6","since":"1988"},{"lf":"Muhimbili Medical Center","freq":"4","since":"1991"}]},{"lf":"migrating motility complex","freq":"14","since":"1983","vars":[{"lf":"migrating motility complex","freq":"12","since":"1983"},{"lf":"migrating motility complexes","freq":"1","since":"1995"},{"lf":"Migrating Motility Complex","freq":"1","since":"1995"}]},{"lf":"mouse mesangial cells","freq":"11","since":"1996","vars":[{"lf":"mouse mesangial cells","freq":"5","since":"1999"},{"lf":"murine mesangial cells","freq":"3","since":"1997"},{"lf":"mouse mesangial cell","freq":"2","since":"1996"},{"lf":"Mouse mesangial cells","freq":"1","since":"2008"}]},{"lf":"Metropolis Monte Carlo","freq":"11","since":"1991","vars":[{"lf":"Metropolis Monte Carlo","freq":"9","since":"1991"},{"lf":"Metropolis Monte-Carlo","freq":"2","since":"1996"}]},{"lf":"Metabolic Measurement Cart","freq":"8","since":"1982","vars":[{"lf":"metabolic measurement cart","freq":"3","since":"1983"},{"lf":"Metabolic Measurement Cart","freq":"3","since":"1982"},{"lf":"metabolic measuring cart","freq":"1","since":"1988"},{"lf":"metabolic measurement carts","freq":"1","since":"2001"}]},{"lf":"malignant mesothelioma cells","freq":"7","since":"1998","vars":[{"lf":"malignant mesothelioma cells","freq":"2","since":"2000"},{"lf":"myeloma cells","freq":"2","since":"2006"},{"lf":"malignant mesothelioma cell","freq":"2","since":"2002"},{"lf":"myeloma cell","freq":"1","since":"1998"}]},{"lf":"macrophage-mediated cytotoxicity","freq":"7","since":"1979","vars":[{"lf":"macrophage-mediated cytotoxicity","freq":"3","since":"1989"},{"lf":"monocyte-mediated cytotoxicity","freq":"2","since":"1994"},{"lf":"Monocyte-mediated cytotoxicity","freq":"1","since":"2000"},{"lf":"Macrophage-mediated cytotoxicity","freq":"1","since":"1979"}]},{"lf":"minimal microbicidal concentration","freq":"6","since":"2002","vars":[{"lf":"minimal microbicidal concentration","freq":"4","since":"2006"},{"lf":"minimal microbicidal concentrations","freq":"2","since":"2002"}]},{"lf":"Modernising Medical Careers","freq":"4","since":"2006","vars":[{"lf":"Modernising Medical Careers","freq":"3","since":"2006"},{"lf":"modernising medical careers","freq":"1","since":"2008"}]},{"lf":"Montefiore Medical Center","freq":"4","since":"2002","vars":[{"lf":"Montefiore Medical Center","freq":"4","since":"2002"}]},{"lf":"mammary carcinoma","freq":"4","since":"2002","vars":[{"lf":"mammary carcinoma","freq":"4","since":"2002"}]},{"lf":"maximum margin criterion","freq":"4","since":"2006","vars":[{"lf":"maximum margin criterion","freq":"3","since":"2006"},{"lf":"Maximum Margin Criterion","freq":"1","since":"2007"}]},{"lf":"morbidity and mortality conference","freq":"3","since":"1991","vars":[{"lf":"Morbidity and Mortality conferences","freq":"1","since":"2008"},{"lf":"Morbidity and mortality conferences","freq":"1","since":"2006"},{"lf":"morbidity and mortality conference","freq":"1","since":"1991"}]},{"lf":"chemotherapy with mitomycin","freq":"3","since":"1999","vars":[{"lf":"chemotherapy with mitomycin","freq":"3","since":"1999"}]},{"lf":"mitochondrial metabolic competence","freq":"3","since":"2004","vars":[{"lf":"mitochondrial metabolic competence","freq":"3","since":"2004"}]},{"lf":"5-fluorouracil (5-FU), mitomycin","freq":"3","since":"1998","vars":[{"lf":"5-fluorouracil (5-FU), mitomycin","freq":"2","since":"2005"},{"lf":"5-fluorouracil (5-Fu), mitomycin","freq":"1","since":"1998"}]},{"lf":"using mitomycin","freq":"3","since":"1996","vars":[{"lf":"using mitomycin","freq":"2","since":"1996"},{"lf":"used mitomycin","freq":"1","since":"2004"}]},{"lf":"fasting duodenal migrating myoelectric (or motor) complex","freq":"3","since":"1992","vars":[{"lf":"fasting duodenal migrating myoelectric (or motor) complex","freq":"2","since":"1992"},{"lf":"Fasting duodenal migrating myoelectric (or motor) complexes","freq":"1","since":"1996"}]},{"lf":"marrow mononuclear cells","freq":"3","since":"1987","vars":[{"lf":"marrow mononuclear cells","freq":"3","since":"1987"}]},{"lf":"Study was done in Anatomy department of Mymensingh Medical College","freq":"2","since":"2006","vars":[{"lf":"Study was done in Anatomy department of Mymensingh Medical College","freq":"1","since":"2007"},{"lf":"Study was done in Anatomy Department of Mymensingh Medical College","freq":"1","since":"2006"}]}]}]';


})(MM || (MM= {}));