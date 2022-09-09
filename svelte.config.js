// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
  compilerOptions: {},

  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte','.md'],

  kit: {
    adapter: adapter(),
    // alias: {},
    // appDir: '_app',
    // csp: {
    //   mode: 'auto',
    //   directives: {
    //     'default-src': undefined
    //     // ...
    //   }
    // },
    // csrf: {
    //   checkOrigin: true
    // },
    // env: {
    //   dir: process.cwd(),
    //   publicPrefix: 'PUBLIC_'
    // },
    files: {
      assets: 'static',
      hooks: 'src/hooks',
      lib: 'src/lib',
      params: 'src/params',
      routes: 'src/routes',
      serviceWorker: 'src/service-worker',
      appTemplate: 'src/app.html',
      errorTemplate: 'src/error.html'
    },
    // inlineStyleThreshold: 0,
    // methodOverride: {
    //   parameter: '_method',
    //   allowed: []
    // },
    // moduleExtensions: ['.js', '.ts'],
    // outDir: '.svelte-kit',
    // paths: {
    //   assets: '',
    //   base: ''
    // },
    // prerender: {
    //   concurrency: 1,
    //   crawl: true,
    //   default: false,
    //   enabled: true,
    //   entries: ['*'],
    //   onError: 'fail',
    //   origin: 'http://sveltekit-prerender'
    // },
    // serviceWorker: {
    //   register: true,
    //   files: (filepath) => !/\.DS_Store/.test(filepath)
    // },
    // trailingSlash: 'never',
    // version: {
    //   name: Date.now().toString(),
    //   pollInterval: 0
    // }
  },

  // options passed to @sveltejs/package
  // package: {
  //   source: 'value of kit.files.lib, if available, else src/lib',
  //   dir: 'package',
  //   emitTypes: true,
  //   // excludes all .d.ts and files starting with _ as the name
  //   exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
  //   files: () => true
  // },

  // options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)
  preprocess: preprocess()
};

export default config;
