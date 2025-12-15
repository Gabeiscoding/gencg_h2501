# Day 02

## Grids


Making a grid in p5.js

For my grid there are circles in a row and these circles move downwards and they change in both colour and size as they move down the grid and this happens repeatedly

To do this. I set variables for the max diameter and minimum diameter of the cell. I made the canvas white. I created a grid by using for loops. Each circle appears in a cell which possesses no colour and no visible lines. A calculation is performed to decide which should be the "activeRow" depending on frame count. The value of the hue also changes depending on frameCount. The circle is drawn by calculating the center of the cell and using current diameter variable (which is itself computed by mapping the current active row onto max and min diameter). 



![image](./content/day02-Grids/Screenshot%202025-09-30%20234147.png)

{% raw %}
<iframe src="https://editor.p5js.org/t2005gabriel/full/KeDerAYOt" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}
