---
template: index.jade
title: Octopus
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="octopus" stl="octopus.stl"/>
    <scale factor="2">
        <stack>
            <octopus></octopus>
            <scale x="1.5" y="1.5">
                <puzzle side1="+rectangle" side2="-triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
