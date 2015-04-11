---
template: tutorial.jade
title: Simple Table
author: doubleshow
---

Four legs

```craftml
<craft name="legs">
    <column spacing="20">
        <repeat n="2">
            <row spacing="20">
                <cylinder height="30"/>
                <cylinder height="30"/>
            </row>
        </repeat>
    </column>
</craft>
```

Top

```craftml
<craft name="top">
    <scale x="5" y="5">
        <cube/>
    </scale>
</craft>
```

Put them together to make a table

```craftml
<craft name="table">
    <craft name="legs">
        <column spacing="20">
            <repeat n="2">
                <row spacing="20">
                    <cylinder height="30"/>
                    <cylinder height="30"/>
                </row>
            </repeat>
        </column>
    </craft>
    <craft name="top">
        <scale x="5" y="5">
            <cube/>
        </scale>
    </craft>
    <stack>
        <align x="50" y="50">
            <top/>
            <legs/>
        </align>
    </stack>
</craft>
```

Parameterize the height of the legs

```craftml
<craft name="table">
    <craft name="legs">
        <parameter name="legHeight" default="30" type="int"/>
        <column spacing="20">
            <repeat n="2">
                <row spacing="20">
                    <cylinder height="{{legHeight}}"/>
                    <cylinder height="{{legHeight}}"/>
                </row>
            </repeat>
        </column>
    </craft>
    <craft name="top">
        <scale x="5" y="5">
            <cube/>
        </scale>
    </craft>
    <stack>
        <align x="50" y="50">
            <top/>
            <legs legHeight="100"/>
        </align>
    </stack>
</craft>
```

