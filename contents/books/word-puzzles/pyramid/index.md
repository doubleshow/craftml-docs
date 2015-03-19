---
template: index.jade
title: Pyramid
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="pyramid" stl="pyramid.stl"/>
    <scale factor="2">
        <stack>
            <pyramid></pyramid>
            <scale x="1.5" y="1.5">
                <puzzle side1="+rectangle" side2="-triangle" side3="-triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
