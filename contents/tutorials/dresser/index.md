---
template: tutorial.jade
title: Dresser
author: calebhsu
---

Dresser frame

```craftml
<craft>
    <cube xsize="40" ysize="15" zsize="49"></cube>
</craft>
```

Stack and position drawers

```craftml
<craft>
    <group>
        <cube xsize="40" ysize="15" zsize="49"></cube>

        <stack spacing="1" x="3" y="-1" z="3">
            <repeat n="4">
                <cube xsize="34"></cube>
            </repeat>
        </stack>
    </group>
</craft>
```

Add drawer knobs

```craftml
<craft>
    <group>
        <cube xsize="40" ysize="15" zsize="49"></cube>
        
        <stack spacing="1" x="3" y="-1" z="3">
            <repeat n="4">
                <cube xsize="34"></cube>
            </repeat>
        </stack>
        
        <row spacing="25" x="5" y="-2" z="6">
            <repeat n="2">
                <stack spacing="9">
                    <repeat n="4">
                        <sphere radius="1"/>
                    </repeat>
                </stack>
            </repeat>
        </row>
    </group>
</craft>
```

Parameterize dresser width and number of drawers

```craftml
<craft name="dresser">
    <parameter name="width" type="int" default="40"/>
    <parameter name="drawers" type="int" default="4"/>
    <group>
        <cube xsize="{{width}}" ysize="15" zsize="{{(drawers * 10) + drawers + 5}}"></cube>
        
        <stack spacing="1" x="3" y="-1" z="3">
            <repeat n="{{drawers}}">
                <cube xsize="{{width - 6}}"></cube>
            </repeat>
        </stack>
        
        <row spacing="{{width - 15}}" x="5" y="-2" z="6">
            <repeat n="2">
                <stack spacing="9">
                    <repeat n="{{drawers}}">
                        <sphere radius="1"/>
                    </repeat>
                </stack>
            </repeat>
        </row>
    </group>
</craft>
```