import nextConfig from "eslint-config-next/core-web-vitals";
import tsConfig from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
    ...nextConfig,
    ...tsConfig,
    prettierConfig,
    {
        // Static export with `images.unoptimized`, so next/image adds nothing over <img>.
        rules: { "@next/next/no-img-element": "off" },
    },
];

export default eslintConfig;
