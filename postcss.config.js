// Connects Tailwind to PostCSS, the CSS-processing engine used by Next.js.
// tailwindcss plugin → expands Tailwind classes into real CSS.
// autoprefixer → automatically adds browser-vendor prefixes.
// Almost never edit this, it must exist so the build toolchain runs CSS correctly.

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
