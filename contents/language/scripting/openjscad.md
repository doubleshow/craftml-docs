---
template: language.jade
title: OpenJSCAD
---


[openjscad](http://openjscad.org/) code can be put in a `<script>` block.


```craftml
<craft>
    <script>
     function main(params) {
        return cube().scale([10,15,20])
    }
    </script>
</craft>
```

openjscad.org's logo

```craftml
<craft>
    <script>
        function main() {
           return union(
              difference(
                 cube({size: 3, center: true}),
                 sphere({r:2, center: true})
              ),
              intersection(
                  sphere({r: 1.3, center: true}),
                  cube({size: 2.1, center: true})
              )
           ).translate([0,0,1.5]).scale(10);
        }
    </script>
</craft>
```