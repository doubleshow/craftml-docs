---
template: index.jade
title: Cactis
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="cactus" stl="cactus.stl"/>
    <scale factor="2">
        <stack>
            <cactus></cactus>
            <scale x="1.5" y="1.5">
                <puzzle side1="+circle" side4="-triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
