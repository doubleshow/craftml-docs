---
template: tutorial.jade
title: Round Table
author: doubleshow
---

Legs in a circle

```craftml
<craft name="legs">
    <script>
        function main(params){
            var legs = []
            var r = 30, n = 6, theta = 0
            var delta = 2 * Math.PI / n
            var ps = []
            for (var i = 0; i < n; i++){

                var p = {
                    x: r * Math.cos(theta),
                    y: r * Math.sin(theta)
                }
                ps.push(p)
                theta = theta + delta
            }
            params.ps = ps
        }
    </script> 
    <repeat each="p" in="{{ps}}">
        <cylinder x="{{p.x}}" y="{{p.y}}" height="30"/>
    </repeat>
</craft>
```

Round table top

```craftml
<craft name="top">
    <cylinder radius="30" height="5"/>    
</craft>
```

Assembled together

```craftml
<craft>
    <craft name="legs">
        <script>
            function main(params){
                var legs = []
                var r = 30, n = 6, theta = 0
                var delta = 2 * Math.PI / n
                var ps = []
                for (var i = 0; i < n; i++){

                    var p = {
                        x: r * Math.cos(theta),
                        y: r * Math.sin(theta)
                    }
                    ps.push(p)
                    theta = theta + delta
                }
                params.ps = ps
            }
        </script> 
        <group>
            <repeat each="p" in="{{ps}}">
                <cylinder x="{{p.x}}" y="{{p.y}}" height="30"/>
            </repeat>
        </group>
    </craft>
    <craft name="top">
        <cylinder radius="40" height="5"/>    
    </craft>
    <stack>
        <align x="50" y="50">            
            <legs/>
            <top/>
        </align>
    </stack>
</craft>
```
