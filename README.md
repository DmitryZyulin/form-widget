# Form Widget

## Usage

In order to embed the widget add the following snippet at any location on the hosting page:

```html
<script>
    (function(w, d, s, o, f, js, fjs) {
        w[o] = w[o] || function() { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    })(window, document, 'script', 'fw', './widget.js')
    fw('init', { debug: true });
</script>
```

During initialization you can pass additional configurations to widget like so:

```diff
-_hw('init');
+_hw('init', { debug: true, themeColors: { background: 'green', font: 'red', button: 'purple' } });
```

You can find a widget of configuration in `IWidgetConfiguration` interface.

## Develop

The widget dev setup is similar to regular client application. To get started:

```bash
npm i
npm dev
```

Open the browser at `localhost:3000`
