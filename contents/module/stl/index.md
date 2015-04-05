---
template: index.jade
title: STL
---

STL

```craftml
<craft>
    <craft name="chair" stl="chair.stl"/>
    <craft name="pin" stl="pin.stl"/>
    <row>
        <align y="50">
            <chair></chair>
            <scale z="0.8">
                <pin></pin>
            </scale>
            <rotate axis="z" degrees="180">
                <chair></chair>
            </rotate>
        </align>
    </row>
</craft>
```