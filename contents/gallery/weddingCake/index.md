---
template: index.jade
title: Wedding Cake
author: calebhsu
---

Wedding Cake

```craftml
<craft>
    <craft name="cake" module="calebhsu/craft-weddingcake"/>
    <craft name="candle" module="calebhsu/craft-candle"/>
    <stack>
        <scale factor="0.3">
            <candle height="20" width="5"></candle>
        </scale>
        <cake tiers="1"></cake>
    </stack>
</craft>
```
