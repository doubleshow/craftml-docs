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

Use `repeat` to generate a row of these level blocks in increasing sizes

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <row>
        <script>
            function main(params){
                var sizes = []
                for (var i = 1; i <= 10; i++){
                    sizes.push(i)
                }
                params.sizes = sizes
            } 
        </script>
        <repeat each="s" in="{{sizes}}">
            <level size="{{s}}"/>
        </repeat>
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
            <script>
                function main(params){
                    var sizes = []
                    for (var i = 1; i <= 10; i++){
                        sizes.push(i)
                    }
                    params.sizes = sizes
                } 
            </script>
            <repeat each="s" in="{{sizes}}">
                <level size="{{s}}"/>
            </repeat>
        </align>
    </stack>
</craft>
```

Putting everything together, create a craft named `Pyramid` where `n` is a parameter that controls the number of levels.

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cube xsize="{{size}}" ysize="{{size}}" zsize="1"/>
    </craft>
    <craft name="pyramid">
        <parameter name="n" default="1" type="int"/>
        <stack>
        <align x="50" y="50">
            <script>
                function main(params){
                    var sizes = []
                    for (var i = 1; i <= params.n; i++){
                        sizes.push(i)
                    }
                    params.sizes = sizes
                } 
            </script>
            <repeat each="s" in="{{sizes}}">
                <level size="{{s}}"/>
            </repeat>
        </align>
    </stack>
    </craft>
    <row>
        <pyramid n="10"/>
        <pyramid n="20"/>
        <pyramid n="30"/>
    </row>
</craft>
```
We can easily modify the shape of individual levels to construct other types of pyramids. For example, by changing `cube` to `cylinder` in line 4, we can construct a cone-like pyramid consisting of disks like below.

```craftml
<craft>
    <craft name="level">
        <parameter name="size" default="5" type="int"/>
        <cylinder radius="{{size}}" height="1"/>
    </craft>
    <craft name="pyramid">
        <parameter name="n" default="1" type="int"/>
        <stack>
            <align x="50" y="50">
                <script>
                    function main(params){
                        var sizes = []
                        for (var i = 1; i <= params.n; i++){
                            sizes.push(i)
                        }
                        params.sizes = sizes
                    } 
                </script>
                <repeat each="s" in="{{sizes}}">
                    <level size="{{s}}"/>
                </repeat>
            </align>
        </stack>
    </craft>
    <row>
        <pyramid n="10"/>
        <pyramid n="20"/>
        <pyramid n="30"/>
    </row>
</craft>
```
