---
template: index.jade
title: Pyramid
author: doubleshow
---

Pyramid

```craftml
<craft>
    <craft name="pyramid">
        <parameter name="n" default="1" type="int"/>
        <scale factor="5">
            <stack>
                <align x="50" y="50">
                    <script type="text/craftml">
                        function main(params){
                            var xml = ''
                            for (var i = 1; i <= params.n; i++){
                                xml = xml + '<cube xsize="' + i + '" ysize="' + i + '" zsize="1"/>'
                            }
                            return xml
                        }
                    </script>
                </align>
            </stack>
        </scale>
    </craft>
    <column>
        <pyramid n="10"/>
        <pyramid n="5"/>
    </column>
</craft>
```
