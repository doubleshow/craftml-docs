---
template: index.jade
title: Pear
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="pear" stl="pear.stl"/>
    <scale factor="2">
        <stack>
            <pear></pear>
            <scale x="1.5" y="1.5">
                <puzzle side2="+circle" side3="-triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
