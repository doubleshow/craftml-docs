---
template: index.jade
title: Pelican
author: qubick
---

Pelican

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <craft name="pelican" stl="pelican.stl"/>
    <scale factor="2">
    	<stack>
			<crop z="10">
         	<pelican></pelican>
			</crop>
         <scale x="1.5" y="1.5">
         	<puzzle side1="+triangle" side2="+rectangle" side4="-circle">
         	</puzzle>
        	</scale>
        </stack>
    </scale>
</craft>
```
