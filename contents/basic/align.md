---
template: index.jade
title: Align
---

```craftml
<craft>
    <cube x="-5" y="-5" ysize="5"></cube>
    <cube x="0" y="0" ysize="10"></cube>
    <cube x="5" y="5" ysize="15"></cube>
    <cube x="10" y="10" ysize="20"></cube>
    <cube x="15" y="15" ysize="25"></cube>
</craft>
```

Align the cubes along the y-axis at 50%, which achieves the effect of centering.

```craftml
<craft>
    <align y="50">
        <cube x="-5" y="-5" ysize="5"></cube>
        <cube x="0" y="0" ysize="10"></cube>
        <cube x="5" y="5" ysize="15"></cube>
        <cube x="10" y="10" ysize="20"></cube>
        <cube x="15" y="15" ysize="25"></cube>
    </align>
</craft>
```

Align the cubes along the y-axis at 100%, which aligns all the cubes along the "top" side.

```craftml
<craft>
    <align y="100">
        <cube x="-5" y="-5" ysize="5"></cube>
        <cube x="0" y="0" ysize="10"></cube>
        <cube x="5" y="5" ysize="15"></cube>
        <cube x="10" y="10" ysize="20"></cube>
        <cube x="15" y="15" ysize="25"></cube>
    </align>
</craft>
```

With `y="0"`, the cubes are aligned along the "bottom" side. 

```craftml
<craft>
    <align y="0">
        <cube x="-5" y="-5" ysize="5"></cube>
        <cube x="0" y="0" ysize="10"></cube>
        <cube x="5" y="5" ysize="15"></cube>
        <cube x="10" y="10" ysize="20"></cube>
        <cube x="15" y="15" ysize="25"></cube>
    </align>
</craft>
```

Let's create a stack of cubes like below.

```craftml
<craft>
    <cube z="20" xsize="5" ysize="5"></cube>
    <cube z="15" xsize="10" ysize="10"></cube>
    <cube z="10" xsize="15" ysize="15"></cube>
    <cube z="5" xsize="20" ysize="20"></cube>
    <cube z="0" xsize="25" ysize="25"></cube>
</craft>
```