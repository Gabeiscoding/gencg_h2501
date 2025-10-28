# Day 03

## Clock


Making a clock in p5.js

For my clock there is either a white or black canvas. There is a white or black line and as the line moves it paints the area is passes each second. it lerps from white to black or black to white.



{% raw %}
<iframe src="https://editor.p5js.org/t2005gabriel/full/9zBFpTr9l" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}


In my second iteration

I have a clock which is composed of 3 concentric circles on a black canvas. There is a white line in each circle that does not overlap with any other circles. Each circle represents different time unit. The largest circle represents the hours, the medium circle the minutes and the smallest circle the seconds. As the line moves the circle changes colour. Each cycle (from 12 to 12), the circle changes from one colour to another. Each circles has a total of 12 colours that it lerps between

For example

- 1st cycle Red -> Blue
- 2nd cycle Blue -> Green

There are triangles on the inside of each circle that represent the numbers of the face of the clock. Finally, the real world time is displayed digitally at the bottom of the screen. Real time is in black text on a white box at the bottom.

{% raw %}
<iframe src="https://editor.p5js.org/t2005gabriel/full/Yiz3yr15Kc" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

[image](./content/day03-Clocks/Screenshot%202025-10-28%20172947.png)