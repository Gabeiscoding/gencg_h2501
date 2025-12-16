# Day 04

## Machine


Making a mechanical like graphic

Here, I have a gear that is constantly oscillating (moving back and forth) from the top to the bottom of the canvas. The gear changes colour gradually from red to orange and vice versa. When nearing the top of the canvas it becomes more red and when near the bottom becomes more orange

So in order to achieve this I define a lowest point and a highest point in the code. THe center of the gear moves between these 2 points. I use lerp to create a colour gradient. Finally I draw the  grooves of the gear by
{% raw %}
<iframe src="https://editor.p5js.org/t2005gabriel/full/N_w_6tTND" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}

I made another machine.

Here, I have two pistons that move toward each other. Here the background or piston is either purple or orange. When the background is purple the piston is orange and vice versa. Piston length is constantly increased. to give the impression of movement. Once the piston length of both piston is greater than the width of the screen the colours are inverted.

{% raw %}
<iframe src="https://editor.p5js.org/t2005gabriel/full/Y8czJ6CZj" width="100%" height="450" frameborder="no"></iframe>
{% endraw %}
