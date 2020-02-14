animated-typing module
----------------------

Text typing animation functionalities.

**@usage**
 ```
 import AnimatedTyping from './animated-typing';

 // uses default render function
 const b = new AnimatedTyping('skying', {speed: 100}).animate();

 // uses custom render function
 const a = new AnimatedTyping('windsurfing', {speed: 400}, function(text, animationFrameCount, fullText, config) {
     document.querySelector('.my-dom-element-class').innerHTML = text;
 }).animate();
```

**@exports**

 AnimatedTyping class

     @properties

         this.text {String}
             The full text to be animated
         this.config {Object}
             Animation config
             Format
                 .speed {Number}
         this.animatedText {String}
             The text being animated (contains N chars of this.text, where N is the number of the animation frames handled by setInterval)
         this.animation {setInterval ref}
             The setInterval instance handling the animation running
         this.animationFrameCount {Number}
             The animation frames count
             Range
             [0, this.text.length - 1]
         this.render {Function}
             The animated text rendering function

     @public methods

         animate()
     
             Starts the text typing animation.
             The animation simulates a user writing the text, one char after the other, at this.config.speed intervals.
             The animation is accomplished by calling the this.config.render(text, fullText, config) function at this.config.speed time intervals.
             The default render function just logs the text typing animation to the console.

**@customize**

 Behaviour can be customized by the module consumer, through this.config and this.render properties
 