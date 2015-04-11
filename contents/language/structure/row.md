---
template: language.jade
title: Row
---

Arrange elements into a row


There are four cubes of different sizes, all positioned at (0,0,0) and overlapping.
```craftml
<craft>
    <scale factor="1"><cube></cube></scale>
    <scale factor="2"><cube></cube></scale>
    <scale factor="3"><cube></cube></scale>
    <scale factor="4"><cube></cube></scale>
</craft>
```


`<row>` arranges these five cubes in a row along the x-axis.

```craftml
<craft>
    <row>
        <scale factor="1"><cube></cube></scale>
        <scale factor="2"><cube></cube></scale>
        <scale factor="3"><cube></cube></scale>
        <scale factor="4"><cube></cube></scale>
    </row>
</craft>
```

The `spacing` attribute can be used to add empty spaces between the cubes.


```craftml
<craft>
    <row spacing="2">
        <scale factor="1"><cube></cube></scale>
        <scale factor="2"><cube></cube></scale>
        <scale factor="3"><cube></cube></scale>
        <scale factor="4"><cube></cube></scale>
    </row>
</craft>
```

The `spacing` attribute can be negative, which will cause the cubes to overlap.

```craftml
<craft>
    <row spacing="-2">
        <scale factor="1"><cube></cube></scale>
        <scale factor="2"><cube></cube></scale>
        <scale factor="3"><cube></cube></scale>
        <scale factor="4"><cube></cube></scale>
    </row>
</craft>
```

A useful application of negative spacing is to connect objects with curved surfaces.

```craftml
<craft>
    <row spacing="-2">
        <scale factor="2"><sphere></sphere></scale>
        <scale factor="2"><sphere></sphere></scale>
        <scale factor="2"><sphere></sphere></scale>
        <scale factor="2"><sphere></sphere></scale>
    </row>
</craft>
```