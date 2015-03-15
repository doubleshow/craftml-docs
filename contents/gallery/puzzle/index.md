---
template: index.jade
title: Puzzle
author: qubick
---

Puzzle

[https://github.com/qubick/craft-puzzle](https://github.com/qubick/craft-puzzle)

```craftml
<craft>
    <craft name="puzzle" module="qubick/craft-puzzle"/>
    <row>
        <puzzle side1="+triangle" side3="+rectangle" side4="+circle"></puzzle>
        <puzzle side1="+triangle" side2="-circle" side3="+circle" side4="+rectangle"></puzzle>
        <puzzle side2="-rectangle" side3="+triangle" side4="+triangle"></puzzle>
    </row>
</craft>```
