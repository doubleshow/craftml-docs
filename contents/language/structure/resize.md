---
template: language.jade
title: Resize
---

Resize (1) a row of two spheres, (2) a row of four spheres, and (3) a cube to occupy a 20 by 20 by 20 volume.

```craftml
<craft>
    <row>
        <resize x="20" y="20" z="20">
            <row>
                <sphere></sphere>
                <sphere></sphere>
            </row>
        </resize>
        <resize x="20" y="20" z="20">
            <row>
                <sphere></sphere>
                <sphere></sphere>
                <sphere></sphere>
                <sphere></sphere>
            </row>
        </resize>
        <resize x="20" y="20" z="20">
            <cube></cube>
        </resize>
    </row>
</craft>
```

