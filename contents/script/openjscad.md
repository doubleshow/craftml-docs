---
template: index.jade
title: OpenJSCAD
---


The type attribute should be `text/openjscad`.


```craftml
<craft>
    <script type="text/openjscad">
     function main(params) {
        return cube().scale([10,15,20])
    }
    </script>
</craft>
```
