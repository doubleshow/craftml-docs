---
template: index.jade
title: Repeat
---

Use `repeat` to create a matrix of 4 by 3 cubes

```craftml
<craft>
    <row>
        <repeat n="4">
            <stack>
                <repeat n="3">
                    <cube></cube>
                </repeat>
            </stack>
        </repeat>
    </row>
</craft>
```
