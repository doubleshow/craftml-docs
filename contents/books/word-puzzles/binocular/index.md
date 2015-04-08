---
template: index.jade
title: Binocular
author: qubick
---

Binocular

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="binocular" stl="binocular.stl"/>
    <stack>
	 	<crop z="10,0">
        <rotate axis="z" degrees="35">
            <binocular></binocular>
        </rotate>
		 </crop>
        <scale x="1.5" y="1.5">
            <puzzle side1="-rectangle" 
                    side2="+triangle"
                    side3="none"
                    side4="+triangle">
            </puzzle>
        </scale>
    </stack>
</craft>
```
