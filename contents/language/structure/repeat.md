---
template: language.jade
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



```craftml
<craft>
    <row>
        <repeat each="x" in={{[10,20,30,40,50]}}>        
            <cube zsize={{x}}></cube>
        </repeat>
    </row>
</craft>
```

```craftml
<craft>
    <parameter name="xs" default="{{[10,20,30,40,50]}}"/>
    <row>
        <repeat each="x" in={{xs}}>
            <cube zsize={{x}}></cube>
        </repeat>
    </row>
</craft>
```

```craftml
<craft>
    <script>
        function main(params){
            params.xs = [10,20,30,40,50]
        }
    </script>
    <row>
        <repeat each="x" in={{xs}}>
            <cube zsize={{x}}></cube>
        </repeat>
    </row>
</craft>
```
