steps

1. pnpm create vite
2. cd vite-project && pnpm i
3. npm run dev
   https://github.com/vitejs/vite/blob/b146007b7e0f78f08c9dc5959de4a4055ceec1b2/packages/vite/src/node/server/index.ts#L300
    1. view page source
    2. source panel
        1. src 编译后的代码
            1. css、tsx、main、热更新
        2. file 源码
        3. @vite/client
        4. @react/refresh 热更新
4. npm run build https://github.com/vitejs/vite/blob/main/packages/vite/src/node/build.ts
    1. 原生 esm
    2. 静态资源拆分
    3. 默认拆包
5. npm run preview https://github.com/vitejs/vite/blob/main/packages/vite/src/node/preview.ts

优势：

1. 速度
2. 开箱即用
    1. 内置 css-module、less、sass、post-css、ts、hmr、tree-shaking、lazy-load、code-split、静态资源解析、https、ssr、
    2. 封装好的插件

原理：

1. esbuild
2. rollup

插件：

1. https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
2. https://github.com/vitejs/vite/tree/main/packages/plugin-react

https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-nightly

https://github.com/github/copilot-docs/blob/main/docs/visualstudiocode/gettingstarted.md#getting-started-with-github-copilot-in-visual-studio-code

https://github.com/ZxBing0066/zlib

pnpm
