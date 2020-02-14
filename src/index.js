/**
 * AnimatedTyping module
 * 
 * @exports
 * 
 *  AnimatedTyping class
 * 
 *      @properties
 * 
 *          this.text {String}
 *              The full text to be animated
 *          this.config {Object}
 *              Animation config
 *              Format
 *                  .speed {Number}
 *          this.animatedText {String}
 *              The text being animated (contains N chars of this.text, where N is the number of the animation frames handled by setInterval)
 *          this.animation {setInterval ref}
 *              The setInterval instance handling the animation running
 *          this.animationFrameCount {Number}
 *              The animation frames count
 *              Range
 *              [0, this.text.length - 1]
 *          this.render {Function}
 *              The animated text rendering function
 * 
 *      @public methods
 * 
 *          animate()
 *      
 *              Starts the text typing animation.
 *              The animation simulates a user writing the text, one char after the other, at this.config.speed intervals.
 *              The animation is accomplished by calling the this.config.render(text, fullText, config) function at this.config.speed time intervals.
 *              The default render function just logs the text typing animation to the console.
 * 
 * @customize
 * 
 *  Behaviour can be customized by the module consumer, through this.config and this.render properties
 * 
 * @usage
 * 
 *  import AnimatedTyping from './animated-typing.js';
 * 
 *  // uses default render function
 *  const b = new AnimatedTyping('skiyng', {speed: 100}).animate();
 * 
 *  // uses custom render function
 *  const a = new AnimatedTyping('windsurf', {speed: 400}, function(text, animationFrameCount, fullText, config) {
 *      document.querySelector('.my-dom-element-class').innerHTML = text;
 *  }).animate();
 */

/**
 * 
 * @param {String} text 
 * @param {Number} animationFrameCount
 * @param {String} fullText 
 * @param {Object} config
 *  .speed {Number}
 */
const _defaultRender = (text, animationFrameCount, fullText, config) => {
    console.log(animationFrameCount + ' => ' + text);
};

const _defaultConfig = {
    speed: 1000 // ms
};

class AnimatedTyping {
    constructor(text, config, render) {
        this.text = text;
        this.config = config || _defaultConfig;
        this.animatedText = '';
        this.animation = null;
        this.animationFrameCount = 0;
        this.render = (render) ? render.bind(this) : _defaultRender.bind(this);
    }

    animate() {
        this.animationFrameCount = 0;
        this.animation = setInterval(() => {
            this._core();
            this.animationFrameCount++;
        }, this.config.speed);
    }

    /**
     * Actually renders animation
     */
    _core() {
        const char = this.text.charAt(this.animationFrameCount);
        this.animatedText += char;
        this.render(this.animatedText, this.animationFrameCount, this.text, this.config);
        if (this.animatedText === this.text) {
            clearInterval(this.animation);
        }
    }

}

export default AnimatedTyping;