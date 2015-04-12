---
template: language.jade
title: Craftml
---

If `main()` returns a string, this string will be interpreted as CraftML and rendered into 3D objects.


Generate a row of three cubes

```craftml
<craft>
    <script>
        function main(){
            return '<row><cube/><cube/><cube/></row>' 
        }
    </script>
</craft>
```


Generate _n_ cubes

```craftml
<craft>
    <craft name="ncubes">
        <parameter name="n" default="1" type="int"/>
        <script>
            function main(params){
                var xml = ''
                for (var i = 0; i < params.n; i++){
                    xml = xml + '<cube/>'
                }
                return xml
            }
        </script>
    </craft>
    <row>
        <ncubes n="10"/>
    </row>
</craft>
```