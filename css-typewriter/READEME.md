## CSS Typewriter

> CSS打字特效

![preview](./preview/demo.webp)

原理其实并不复杂，需要使用两个动画来实现。

光标特效不断变换`border-right-color`从默认透明色变换到`rgba(255, 255, 255, .75)`无限循环即可。

文字从无到有就需要提前知道文字的长度，之后`keyframes`设置为宽度从0至字体长度，这里的`steps(50)`是为了让动画效果逐帧演示使得有断断续续打字的感觉，但也不能设得太大不然就没有逐帧的感觉，一般控制在长度的2倍左右。最后一个`both`是为了让打字动画一开始呈现的就是第一针的效果也就是隐藏原有的文本效果。

了解原理之后发现想要动态控制动画还是没有js来的方便，毕竟长度以及帧数都不好确定，硬要实现可能还要动态修改`keyframes`。实际上js实现打字特效的性能也不会太差。

个人觉得使用场景不是很多，不过也是可以在特定场合使用，例如页面中确定的文案想要有打字的特效又不想用图片又不想用js来写就可以试试这个。

```css
.anim-typewriter {
    animation: typewriter 4s steps(50) 1s both,
        blinkTextCursor .8s infinite;
}

@keyframes typewriter {
    from {
        width: 0;
    }

    to {
        width: 27em;
    }
}

@keyframes blinkTextCursor {
    from {
        border-right-color: rgba(255, 255, 255, .75);
    }

    to {
        border-right-color: transparent;
    }
}
```
