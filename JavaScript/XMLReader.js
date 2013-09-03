function XMLReader()
{
    var Private;
    (function(){
        Private = 
        {
            //Variables
            m_filename: 0,
            m_file: 0
        };
    }());

    //Public Member Functions
    this.GetBaseNodes = function(name)
    {
        if(typeof Private.m_file !== "object")
        {
            alert("Cannot retrieve base nodes:" + name + ", as an XML file has not been loaded!");
            return false;
        }

        return Private.m_file.getElementsByTagName(name);
    };

    this.GetFile = function()
    {
        return Private.m_file;
    };

    this.Open = function(filename)
    {
        var xmlFile;
        if(window.XMLHttpRequest)
        {
            xmlFile = new XMLHttpRequest();
        }
        else
        {
            xmlFile = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if(jQuery.browser['msie'] === undefined)
        {
            xmlFile.overrideMimeType('application/xml');
        }

        xmlFile.open("GET", filename, false);
        xmlFile.send();
        Private.m_file = xmlFile.responseXML;
        Private.m_file = Private.m_file.getElementsByTagName("MD5")[0];
    };
}