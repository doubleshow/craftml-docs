---
template: index.jade
title: Repeat
---

Use `repeat` to create a matrix of 8 by 10 cubes

```craftml
<craft>
    <row>
        <repeat n="8">
            <stack>
                <repeat n="10">
                    <cube></cube>
                </repeat>
            </stack>
        </repeat>
    </row>
</craft>
```
