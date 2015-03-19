---
template: index.jade
title: Wrench
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="wrench" stl="wrench.stl"/>
    <scale factor="2">
        <stack>
            <wrench></wrench>
            <scale x="1.5" y="1.5">
                <puzzle side3="-circle" side4="-rectangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
