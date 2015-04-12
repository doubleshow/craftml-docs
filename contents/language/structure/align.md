---
template: language.jade
title: Align
---

```craftml
<craft>
    <cube x="-10" y="-10" ysize="10"></cube>
    <cube x="0" y="0" ysize="20"></cube>
    <cube x="10" y="10" ysize="30"></cube>
    <cube x="20" y="20" ysize="40"></cube>
</craft>
```

Align the cubes along the y-axis at 50%, which achieves the effect of centering.

```craftml
<craft>
    <align y="50">
        <cube x="-10" y="-10" ysize="10"></cube>
        <cube x="0" y="0" ysize="20"></cube>
        <cube x="10" y="10" ysize="30"></cube>
        <cube x="20" y="20" ysize="40"></cube>
    </align>
</craft>
```

Align the cubes along the y-axis at 100%, which aligns all the cubes along the "top" side.

```craftml
<craft>
    <align y="100">
        <cube x="-10" y="-10" ysize="10"></cube>
        <cube x="0" y="0" ysize="20"></cube>
        <cube x="10" y="10" ysize="30"></cube>
        <cube x="20" y="20" ysize="40"></cube>
    </align>
</craft>
```

With `y="0"`, the cubes are aligned along the "bottom" side. 

```craftml
<craft>
    <align y="0">
        <cube x="-10" y="-10" ysize="10"></cube>
        <cube x="0" y="0" ysize="20"></cube>
        <cube x="10" y="10" ysize="30"></cube>
        <cube x="20" y="20" ysize="40"></cube>
    </align>
</craft>
```

Let's create a stack of cubes like below.

```craftml
<craft>
    <cube z="40" xsize="10" ysize="10"></cube>
    <cube z="30" xsize="20" ysize="20"></cube>
    <cube z="20" xsize="30" ysize="30"></cube>
    <cube z="10" xsize="40" ysize="40"></cube>
    <cube z="0" xsize="50" ysize="50"></cube>
</craft>
```


```craftml
<craft>
    <align x="50" y="50">
        <cube z="40" xsize="10" ysize="10"></cube>
        <cube z="30" xsize="20" ysize="20"></cube>
        <cube z="20" xsize="30" ysize="30"></cube>
        <cube z="10" xsize="40" ysize="40"></cube>
        <cube z="0" xsize="50" ysize="50"></cube>
    </align>
</craft>
```