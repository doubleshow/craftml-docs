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
                <script type="text/craftml">
                    function main(params){
                        var xml = ''
                        for (var i = 1; i <= params.n; i++){
                            xml = xml + '<cube xsize="' + i + '" ysize="' + i + '" zsize="1"/>'
                        }
                        return xml
                    }
                </script>
            </stack>
        </scale>
    </craft>
    <pyramid n="5"/>
</craft>
```
