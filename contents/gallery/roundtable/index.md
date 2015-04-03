---
template: index.jade
title: Round Table
author: doubleshow
---

Legs in a circle

```craftml
<craft>
    <script type="text/craftml">
function main(){
    var legs = []
    var r = 30, n = 6, theta = 0
    var delta = 2 * Math.PI / n
    for (var i = 0; i < n; i++){
        var x = r * Math.cos(theta)
        var y = r * Math.sin(theta)
        legs.push('<cylinder x="' + x + '" y="' + y + '" height="30"/>')
        theta = theta + delta
    }
    return legs.join('\n')
}            
    </script>   
</craft>
```

Round table top

```craftml
<craft>
    <cylinder radius="30" height="5"/>    
</craft>
```

Assembled together

```craftml
<craft>
    <stack>
        <align x="50" y="50">            
            <group>
                <script type="text/craftml">
        function main(){
            var legs = []
            var r = 30, n = 6, theta = 0
            var delta = 2 * Math.PI / n
            for (var i = 0; i < n; i++){
                var x = r * Math.cos(theta)
                var y = r * Math.sin(theta)
                legs.push(leg(x,y,30))
                theta = theta + delta
            }
            return legs.join('\n')
        }            

        function leg(x,y,h){
            return '<cube x="' + x 
            + '" y="' + y 
            + '" height="' + h + '"/>'
        }
                </script>
            </group>
            <cylinder radius="40" height="5"/>            
        </align>
    </stack>
</craft>
```
