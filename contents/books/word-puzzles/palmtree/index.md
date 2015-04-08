---
template: index.jade
title: Palmtree
author: qubick
---

Octopus

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="palmtree" stl="palmtree.stl"/>
    <scale factor="2">
        <stack>
		  	<crop z="50,0">
            <palmtree></palmtree>
			</crop>
            <scale x="1.5" y="1.5">
                <puzzle side1="+triangle" side2="-triangle" side3="-circle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
