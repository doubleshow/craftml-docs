---
template: index.jade
title: Walus
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="walus" stl="walus.stl"/>
    <scale factor="2">
        <stack>
            <walus></walus>
            <scale x="1.5" y="1.5">
                <puzzle side1="+circle" side2="-circle" side3="-triangle" side4="+triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
