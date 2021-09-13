import commonjs from '@rollup/plugin-commonjs'; // Конвертирование CommonJS модулей в ES6
import vue from 'rollup-plugin-vue'; // Обработка однофайловых компонентов .vue
import babel from "@rollup/plugin-babel"; // Транспиляция/добавление полифилов для умеренной поддержки браузеров

export default {
  input: 'src/plugin.js', // Путь до относительного package.json
  output: {
    name: 'SimplePdfViewer',
    exports: 'named',

    globals: {
        'pdfjs-dist/build/pdf': 'pdfjsLib',
        'pdfjs-dist/web/pdf_viewer': 'pdf_viewer',
    }
  },
  external: [
    /core-js*/,
    /pdfjs-dist*/
  ],
  plugins: [
    commonjs(),
    vue({
      css: true, // Динамически внедряем CSS в тег <style>
      compileTemplate: true, // Явное преобразование шаблона в рендер-функцию
    }),
    babel({ babelHelpers: 'runtime' })
  ],
};
