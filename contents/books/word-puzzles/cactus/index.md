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
		      <crop z="50,0">
		  	        <rotate axis="y" degrees="12">
                    <cactus></cactus>
			        </rotate>
			    </crop>
            <scale x="1.5" y="1.5">
                <puzzle side1="+circle" side4="-triangle">
                </puzzle>
            </scale>
        </stack>
    </scale>
</craft>
```
