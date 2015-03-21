---
template: index.jade
title: Row
---

Arrange elements into a row

In this example, ten cubes are created and arranged in a row. By default, elements are centered with respect to `y` and lie flat on the ground plane (`z=0`).

```craftml
<craft>
    <row>
        <cube></cube>
        <cube></cube>
        <cube></cube>
        <cube></cube>
        <cube ysize="20" zsize="10"></cube>
        <cube ysize="40" zsize="20"></cube>
        <cube></cube>
        <cube></cube>
        <cube></cube>
        <cube></cube>
    </row>
</craft>
```
