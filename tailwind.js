/*
! tailwind css
CSS framework that simplifies the process of styling web pages by providing a set of pre-built utility classes
- go to their doc and install it for react, next js
* colors and texts
- bg-color-amount   -    text-color-amount
colors => red black green grey blue orange yellow purple brown pink rose eky teal cyan indigo stone amber... 
amount => 100 ... 900
- bg-[#12EDH4] => for a specific color, you can add /6 to reduce the opacity
- text-xs(sm, md, lg, xl, 2x.. 9xl or you specify)
- text-normal(thin, medium, semibold, bold)
- font-sans font-mono... (the font family if you already defined it)
- tracking-tight (normal, wide) => letter spacing
- text-left (right, center) => text alignment
- underline (decoration-4 to make it thicker decoration-blue-400 decoration-double(dashed, dotted, wavy)) => decoration
- normal-case (upperCase, lowerCase, capitalize ) => text transform
* shadow
shadow-xs (sm, md, lg, xl, 2xl) - shadow-color-degree  => to change the color
* borders and border radius and outline
border, border-2 (4 8..etc), border-color-amount border-x-4 (l(left), r, t, b ,x ,y)
rounded-(sm, md, lg, xl, 2xl, 3xl, full) , rounded-b-md
outline, outline-red-500 outline-4 (thick) outline-offset
* gradient
bg-gradient-to-right from-gray-100 to-red-500
* background
- bg-auto, bg-cover, bg-center  (background-size)
- bg-no-repeat, bg-repeat-x
- bg-gradient-to-direction from-color to-color => gradient
bg-gradient-to-r from-gray-100 to-red-500
* filter
- blur-none blur(0), blur-sm, blur, blur-md (lg, xl, 2xl, 3xl)
- brightness-50 (75, 100, 125, 150, 200), 
- contrast-50 (100, 150, 200)
- grayscale, invert


! layout
* positioning
- relative, absolute bottom-0 left-0 top-0 right-0
- inline, block, inline-block, hidden => display
- z-10 (10 ... 100) => z index
* interactivity
hover:space-x-10, active ...
cursor-pointer (wait, not-allowed)
select-none
* padding and margin
p-2 (1; 2, 4, 6, 8, 10 ...) - px-2 (x, y, l, r, t, b) - p-[20px] - p-auto => inner space
m-2 (1; 2, 4, 6, 8, 10 ...) - m-auto => outer space between elements
* width and height
w-1 (2, 3...100..) - w-full(100%) w-screen(100vw) - w-[300px] - w-1/2 - max-w-sm(lg, xl, 2xl)
same for height
* flex
- parent: flex flex-row(col) - space-x-6 - space-y-8 - justify-between(start, end...) - items-center (align)
- child: order-2(to order elements) - flex-auto (flex: 1 1 auto grow and shrink taking the initial  size into account) flex-1 flex-none flex-auto
* grid
- parent: grid - grid-cols-12 (1...12 => grid-template-columns: repeat(1, minmax(0, 1fr)))  - gap-4 (gap-x-12)
- child: col-span-4 lg:col-span-12
* columns
- columns: 4 breaks the content into 4, columns-6(4 => 10) put images and classify into 4 gap-2 (space between them)
columns-xs (2xs, 3xs) => to make them get into the blank space to fill it
* responsive design (breakpoints and queries)
xs:sm:red-200 () -  sm: (640) - md: (768) - lg: (1024) - xl: (1280)


! setup
* animation
duration-100 (100, 150...1500) - transition-all(color, shadow, bg...) - opacity-20 - scale-1.5 scale-x-1.1
* fonts 
* config and customization
- inside the config file, if we write fields inside theme, it overwrites the existing one , but if we write it inside extend , we add it to them
module.exports = {
  theme: {
    screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
        xs: { max: "479px" },
        new: { max: "479px" },
    },
    extend: {
      backgroundColor: {
        'primary': '#ff0000',
      },
      fontSize: {
        '5xl': '3rem',
      },
      gradients: {
        'gradient-to-top-left': ['to top left', '#4facfe', '#00f2fe'],
      },
      boxShadow: {
        "3xl": "0 15px 15px 1px rgba(80,230,217, 0.4)",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
}
* reference a css variable to tailwind
:root {
  --main-color: #007bff;
}
primary: "var(--main-color)"

! dark mode 
* 1st way
tailwind.config = {
    darkMode: "class"
}
- add and remove dark class in html tag
text-red dark:text-black
- in react, we define a button that aims for html element


* 4th way => several themes 
in css define variables
.light {
    __primary= #007bff;
}
.dark {
    __primary= #217bff;
}
.blue {
    __primary= #017f3f;
}
<body className="light">
or
@meida (prefer-color-scheme: dark) {
    :root {}
}
- you change between them 
useEffect(() => {
    // NOTE: This should be set based on some kind of toggle or theme selector.
    // I've added this here for demonstration purposes
    localStorage.setItem("theme", "light");

    // If the user has selected a theme, use that
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);

      // Else if the users OS preferences prefers dark mode
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");

      // Else use light mode
    } else {
      document.body.classList.add("light");
    }
  }, []);

*/ 



/*
! installation IN JS/html/css
npm install -D tailwindcss
npx tailwindcss init
- in the config file
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
- create input.css that would convert tailwind to css
@tailwind base;
@tailwind components;
@tailwind utilities;
- in package.json 
"build": "tailwindcss -i ./input.css -o ./css/style.css --watch"
npm run build => to convert 
npm run watch => to just watch
- open with live server
*/
