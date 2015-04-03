---
template: index.jade
title: Pen Holder
author: doubleshow
---

A single layer of four walls

```craftml
<craft>
    <craft name="layer">
        <cube y="-10" ysize="100"/>
        <cube x="-10" xsize="100"/>
        <cube x="70" y="-10" ysize="100"/>
        <cube x="-10" y="70" xsize="100"/>
    </craft>
    <layer></layer>
</craft>
```

A stack of these layers rotated at different angles

```craftml
<craft>
    <craft name="layer">
        <parameter name="degrees" default="0" type="int"/>
        <rotate axis="z" degrees="{{degrees}}">
            <cube y="-10" ysize="100"/>
            <cube x="-10" xsize="100"/>
            <cube x="70" y="-10" ysize="100"/>
            <cube x="-10" y="70" xsize="100"/>
        </rotate>
    </craft>
    <scale factor="0.5">
    <stack>
        <align x="50" y="50">
            <script type="text/craftml">
                function main(){
                    var xml = ''
                    for (var i=20; i>0; i=i-1){
                        var d = i * 2
                        xml += '<layer degrees="' + d + '"></layer>'
                    }
                    return xml
                }
            </script>
        </align>
    </stack>
    </scale>
</craft>
```
