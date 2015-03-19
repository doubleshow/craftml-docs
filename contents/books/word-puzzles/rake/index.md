---
template: index.jade
title: Rake
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="rake" stl="rake.stl"/>
    <scale factor="2">
        <stack>
            <rake></rake>
            <scale x="1.5" y="1.5">
                <puzzle side1="+rectangle" side2="-circle" side3="-circle" side4="+circle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
