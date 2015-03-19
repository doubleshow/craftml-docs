---
template: index.jade
title: Feather
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="feather" stl="feather.stl"/>
    <scale factor="2">
        <stack>
            <scale x="1.2" y="1.2">
					<feather></feather>
				</scale>
            <scale x="1.5" y="1.5">
                <puzzle side1="+circle" side2="+triangle" side4="-rectangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
