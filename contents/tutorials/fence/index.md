---
template: tutorial.jade
title: Picket Fence
author: calebhsu
---

Picket boards

```craftml
<craft>
    <row spacing="5">
        <repeat n="5">
            <cube xsize="5" ysize="3" zsize="35">
        </repeat>
    </row>
</craft>
```

Picket spikes

```craftml
<craft>
    <row spacing="5">
        <repeat n="5">
            <rotate axis="x" degrees="90">
                <rotate axis="z" degrees="90">
                    <cylinder radius="2.89" resolution="3" height="3" z="40"></cylinder>  
                </rotate>    
            </rotate>
        </repeat>
    </row>
</craft>
```

Stack and position to make pickets

```craftml
<craft>
    <stack>
        <row spacing="5">
            <repeat n="5">
                <rotate axis="x" degrees="90">
                    <rotate axis="z" degrees="90">
                        <cylinder radius="2.89" resolution="3" height="3" z="40"></cylinder>  
                    </rotate>    
                </rotate>
            </repeat>
        </row>

        <row spacing="5">
            <repeat n="5">
                <cube xsize="5" ysize="3" zsize="35">
            </repeat>
        </row>
    </stack>
</craft>
```

Create rails

```craftml
<craft>
    <stack spacing="10" z="7">
        <repeat n="2">
            <cube xsize="45" ysize="2" zsize="5"></cube>
        </repeat>
    </stack>
</craft>
```

Combine and position to make fence

```craftml
<craft>
    <group>
        <stack spacing="10" y="1" z="7">
            <repeat n="2">
                <cube xsize="50" ysize="2" zsize="5"></cube>
            </repeat>
        </stack>

        <stack>
            <row spacing="5">
                <repeat n="6">
                    <rotate axis="x" degrees="90">
                        <rotate axis="z" degrees="90">
                            <cylinder radius="2.89" resolution="3" height="3" z="40"></cylinder>  
                        </rotate>    
                    </rotate>
                </repeat>
            </row>

            <row spacing="5">
                <repeat n="6">
                    <cube xsize="5" ysize="3" zsize="35">
                </repeat>
            </row>
        </stack>
    </group>
</craft>
```

Parameterize length and height of fence

```craftml
<craft name="fence">
    <parameter name="length" type="int" default="55"/>
    <parameter name="height" type="int" default="40"/>
    <group>
        <stack spacing="{{height / 3}}" y="1" z="{{height / 6}}">
            <repeat n="2">
                <cube xsize="{{length}}" ysize="2" zsize="5"></cube>
            </repeat>
        </stack>
        
        <stack>
            <row spacing="5">
                <repeat n="{{length / 10}}">
                    <rotate axis="x" degrees="90">
                        <rotate axis="z" degrees="90">
                            <cylinder radius="2.89" resolution="3" height="3" z="{{height + 5}}"></cylinder>  
                        </rotate>    
                    </rotate>
                </repeat>
            </row>
            
            <row spacing="5">
                <repeat n="{{length / 10}}">
                    <cube xsize="5" ysize="3" zsize="{{height}}">
                </repeat>
            </row>
        </stack>        
    </group>
</craft>
```