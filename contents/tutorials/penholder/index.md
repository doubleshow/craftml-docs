---
template: tutorial.jade
title: Pen Holder
author: doubleshow
---


Create the first set of two walls.

```craftml
<craft>
    <row spacing="25">
        <cube xsize="5" ysize="40" zsize="5"/>
        <cube xsize="5" ysize="40" zsize="5"/>
    </row>
</craft>
```

Create the another set of two walls.

```craftml
<craft>
    <column spacing="25">
        <cube xsize="40" ysize="5" zsize="5"/>
        <cube xsize="40" ysize="5" zsize="5"/>
    </column>
</craft>
```

Put them together to form a single layer

```craftml
<craft>
    <row spacing="25">
        <cube xsize="5" ysize="40" zsize="5"/>
        <cube xsize="5" ysize="40" zsize="5"/>
    </row>
    <column spacing="25">
        <cube xsize="40" ysize="5" zsize="5"/>
        <cube xsize="40" ysize="5" zsize="5"/>
    </column>
</craft>
```

Align them

```craftml
<craft>
    <align x="50" y="50">
        <row spacing="25">
            <cube xsize="5" ysize="40" zsize="5"/>
            <cube xsize="5" ysize="40" zsize="5"/>
        </row>
        <column spacing="25">
            <cube xsize="40" ysize="5" zsize="5"/>
            <cube xsize="40" ysize="5" zsize="5"/>
        </column>
    </align>
</craft>
```

Define a `layer` craft to generate multiple copies that can be stacked.

```craftml
<craft>
    <craft name="layer">
        <group>
            <align x="50" y="50">
                <row spacing="25">
                    <cube xsize="5" ysize="40" zsize="5"/>
                    <cube xsize="5" ysize="40" zsize="5"/>
                </row>
                <column spacing="25">
                    <cube xsize="40" ysize="5" zsize="5"/>
                    <cube xsize="40" ysize="5" zsize="5"/>
                </column>
            </align>
        </group>
    </craft>
    <stack>
        <layer></layer>
        <layer></layer>
        <layer></layer>
    </stack>
</craft>
```

Rotate each layer at an angle.

```craftml
<craft>
    <craft name="layer">
        <group>
            <align x="50" y="50">
                <row spacing="25">
                    <cube xsize="5" ysize="40" zsize="5"/>
                    <cube xsize="5" ysize="40" zsize="5"/>
                </row>
                <column spacing="25">
                    <cube xsize="40" ysize="5" zsize="5"/>
                    <cube xsize="40" ysize="5" zsize="5"/>
                </column>
            </align>
        </group>
    </craft>
    <stack>
        <rotate axis="z" degrees="10"><layer></layer></rotate>
        <rotate axis="z" degrees="15"><layer></layer></rotate>
        <rotate axis="z" degrees="20"><layer></layer></rotate>
    </stack>
</craft>
```

Use `repeat` to generate any number of layers.

```craftml
<craft>
    <parameter name="n" default="30" type="int"/>
    <craft name="layer">
        <group>
            <align x="50" y="50">
                <row spacing="25">
                    <cube xsize="5" ysize="40" zsize="2"/>
                    <cube xsize="5" ysize="40" zsize="2"/>
                </row>
                <column spacing="25">
                    <cube xsize="40" ysize="5" zsize="2"/>
                    <cube xsize="40" ysize="5" zsize="2"/>
                </column>
            </align>
        </group>
    </craft>
    <script>
        function main(params){
            var ds = []
            for (var i=params.n; i>0; i=i-1){
                var d = i * 2
                ds.push(d)
            }
            params.ds = ds
        }
    </script>    
    <stack>
        <align x="50" y="50">
        <repeat each="d" in="{{ds}}">
            <rotate axis="z" degrees="{{d}}">
                <layer></layer>
            </rotate>
        </repeat>
        </align>
    </stack>
</craft>
```
