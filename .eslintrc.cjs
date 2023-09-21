module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  /**
   * "off" 或 0 ==> 关闭规则
   * "warn" 或 1 ==> 打开的规则作为警告(不影响代码执行)
   * "error" 或 2 ==> 规则作为一个错误(代码不能执行，界面报错)
   */
  rules: {
    "no-var": "error", // 要求使用let 或者 const 而不是var
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unexpected-multiline": "error", // 禁止空余的多行
    "no-useless-escape": "off", // 禁止不必要的转义字符

    //   typescript
    "@typescript-eslint/no-unused-vars": "error", //禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-explicit-any": "error", // 禁止使用 any 类型
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 Typescript模块
    "@typescript-eslint/semi": "off",

    //   vue
    "vue/multi-word-component-names": "off", //要求组件名称始终为 “-”链接的单词
    "vue/script-setup-uses-vars": "error", // 防止script setup 使用的变量 template
    "vue/no-mutatig-props": "off", // 不允许组件prop的改变
    "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
  },
};
