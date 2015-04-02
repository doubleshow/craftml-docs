---
template: index.jade
title: Pyramid
author: doubleshow
---

Let's start by makeing indvidual levels as reusable craft components. It takes a `size` parameter to generate flat rectangular block of `size` by `size` y `1`. 

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <row>
        <level size="10"/>
        <level size="20"/>
        <level size="30"/>
    </row>
</craft>
```

Write a loop to generate a bunch of these level blocks in increasing sizes

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <row>
        <script type="text/craftml">
            function main(params){
                var xml = ''
                for (var i = 1; i <= 10; i++){
                    xml += '<level size="' + i + '"/>'
                }
                return xml
            } 
        </script>
    </row>
</craft>
```

Stack them up and align them to center along x and y axes.

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <stack>
        <align x="50" y="50">
            <script type="text/craftml">
                function main(params){
                    var xml = ''
                    for (var i = 1; i <= 10; i++){
                        xml += '<level size="' + i + '"/>'
                    }
                    return xml
                } 
            </script>
        </align>
    </stack>
</craft>
```

Putting everything together, create a craft named `Pyramid` that takes `n` as a parameter to generate pyramids of `n` levels.

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <craft name="pyramid">
        <parameter name="n" default="1" type="int"/>
        <scale factor="5">
            <stack>
                <align x="50" y="50">
                    <script type="text/craftml">
                function main(params){
                    var xml = ''
                    for (var i = 1; i <= params.n; i++){
                        xml += '<level size="' + i + '"/>'
                    }
                    return xml
                } 
                    </script>
                </align>
            </stack>
        </scale>
    </craft>
    <row>
        <pyramid n="10"/>
        <pyramid n="5"/>
    </row>
</craft>
```
