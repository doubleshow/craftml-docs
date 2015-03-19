---
template: index.jade
title: Saw
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="saw" stl="saw.stl"/>
    <scale factor="2">
        <stack>
            <saw></saw>
            <scale x="1.5" y="1.5">
                <puzzle side2="+triangle" side3="-circle" side4="-circle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
