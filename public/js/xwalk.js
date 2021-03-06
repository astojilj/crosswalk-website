"use strict";



function replace_version_string (str) {
    var re, version;
    Object.getOwnPropertyNames (versions).forEach (function (channel) {
        Object.getOwnPropertyNames (versions[channel]).forEach (function (platform) {
            Object.getOwnPropertyNames (versions[channel][platform]).forEach (
                function (arch) {
                    version = versions[channel][platform][arch];

                    /* Replace ${XWALK-channel-platform-arch} with the version
                    * number, unless prefixed by ! */
                    re = new RegExp ('([^!])\\$({|%7b)XWALK-'+channel+'-'+
                                     platform+'-'+arch+'(}|%7d)', 'mig');

                    str = str.replace (re, '$1' + version);

                    /* If !${XWALK-channel-platform-arch} is present, strip
                     * the leading ! and leave just the variable reference  */
                    re = new RegExp ('!(\\$({|%7b)XWALK-'+channel+'-'+
                                     platform+'-'+arch+'(}|%7d))', 'mig');
                    str = str.replace (re, '$1');

                    /* Replace ${XWALK-channel-platform-arch-MAJOR}
                     * with the first number from the version string
                     * unless prefixed with ! */
                    var major = version.replace (/^([^.]+)\..*/, '$1');
                    re = new RegExp ('([^!])\\$({|%7b)XWALK-'+channel+'-'+
                                     platform+'-'+arch+'-MAJOR(}|%7d)', 'mig');
                    str = str.replace (re, '$1' + major);

                    /* If !${XWALK-channel-platform-arch-MAJOR} is present, strip
                     * the leading ! and leave just the variable reference  */
                    re = new RegExp ('!(\\$({|%7b)XWALK-'+channel+'-'+
                                     platform+'-'+arch+'-MAJOR(}|%7d))', 'mig');
                    str = str.replace (re, '$1');
                });
            });
        });
    return str;
}

function init () {
    /* Set title to the main header string (first h1 value) */
    var mainHeader = document.getElementsByTagName("H1")[0].innerHTML;
    if (mainHeader) {
        document.title = "Crosswalk - " + mainHeader;
    }

    /* Replace all version instances with the correct version numbers */
    document.body.innerHTML = replace_version_string (document.body.innerHTML);
}

if (document.addEventListener) {
    document.addEventListener ('DOMContentLoaded', init);
}

