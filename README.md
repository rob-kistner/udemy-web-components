# Web Components & Stencil JS: Build Custom HTML Elements
A Udemy.com course by Max Schwarzmüller.

Started Dec 31, 2018

---

### Notes on using Shadow DOM

When you add elements to the ShadowDOM, they will disappear from the regular DOM, i.e. below: the text "Web Components" contained in the element will not appear...

```
<uc-tooltip>Web Components</uc-tooltip>
```

Also, within the ShadowDOM, document styling does not affect the specific component. i.e.: setting an orange border around all `div`s in a global stylesheet will not affect the ShadowDOM created `div`.