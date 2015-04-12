---
template: language.jade
title: Jade
---

```craftml
<craft>
    <script type="text/craftml">
        function main(){
            return '<row><cube/><cube/><cube/></row>' 
        }
    </script>
</craft>
```


Use a function to generate _n_ cubes.

```craftml
<craft>
    <craft name="ncubes">
        <parameter name="n" default="1" type="int"/>
        <script type="text/craftml">
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