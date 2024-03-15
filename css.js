/*
! container
note: don't you ever use fixed width 
Step 1: Create a container
Step 2: Styling the container and making it responsive
width: 100%;
max-width: 700px;
By default, a div container like this would occupy 100% width of any screen, but let's say you want to give it a defined width, you'd want that container to automatically adjust to any screen size, right? You can do that without writing media queries.
 give it a width of 100%, then set max-width to the requirement of your project. Here, we will go with 700px...
 You can center the container using margin: auto; if it is required in your project.
Using the developer tools in your browser, you can adjust the viewport of your screen to see the responsiveness of the container. Make sure to fine-tune the max-width to your project's requirement.$

Why 'max-width'?
In responsive design, the max-width property is used to set the maximum width of an element on a webpage. This means that if the viewport or device width is less than the set max-width, the element will shrink to fit within the available space. However, if the viewport width is larger than the max-width, the element will not stretch beyond the specified width.

If you only use max-width without width: 100%;, the container may only stretch to fit the content within it and not the full width of your requirement. Therefore, you need to include width: 100%; to ensure that the container expands to fill the entire width of the screen while still adhering to the max-width limit you set.

! min height 
When creating containers with a fixed width, it may be necessary to specify a height for them in your project. However, if you're taking the desktop-first approach, setting a fixed height could cause the container's content to spill over on smaller devices. In other words, if you set a fixed height for a container, it may not adjust well to smaller screens, and the content inside the container could overflow or become distorted. Therefore, it's essential to keep in mind the responsiveness of your design and consider using the min-height property instead.
Suppose you have a container containing text with a set width and maximum width, and you want to give it a specific height of 200px. In that case, you should use the "min-height" property to set the height. This property ensures that the container's height won't be smaller than the specified value, but it can expand beyond that height to accommodate the content inside it. This way, you can keep your design consistent while allowing flexibility for different amounts of text or varying screen sizes.

*/ 

/*
! width 
- auto: will keep 
- 100%: will make the element as wide as the parent container, extra size (margin..) will cause problems and overflow
- 100vh: width of the available scree, if you add a margin , a scroll would appear
- width: specific with, if you resize it'd overflow
- maxWidth: it can be smaller and can be resized
- padding: used for inner space inside the box
- margin: is used for outer space between elements
- text-align center: center images, texts, inline elements
- margin: auto
*/ 



/*
! flex
Flex box Parent Properties:

1. **`display`**: sets the display type to **`flex`**.
2. **`flex-direction`**: sets the direction of the main axis. It can be **`row`** (default), **`row-reverse`**, **`column`**, or **`column-reverse`**.
3. **`flex-wrap`**: sets how items should wrap if there are too many to fit on one line. It can be **`nowrap`** (default), **`wrap`**, or **`wrap-reverse`**.
4. **`justify-content`**: aligns items along the main axis. It can be **`flex-start`** (default), **`flex-end`**, **`center`**, **`space-between`**, **`space-around`**, or **`space-evenly`**.
5. **`align-items`**: aligns items along the cross axis. It can be **`stretch`** (default), **`flex-start`**, **`flex-end`**, **`center`**, or **`baseline`**.
6. **`align-content`**: aligns the flex lines along the cross axis. It can be **`stretch`** (default), **`flex-start`**, **`flex-end`**, **`center`**, **`space-between`**, **`space-around`**, or **`space-evenly`**.
7. **`flex-flow`**: a shorthand property for **`flex-direction`** and **`flex-wrap`**.

Flex box Child Properties:

1. **`flex-grow`**: determines how much a flex item will grow relative to other flex items.
2. **`flex-shrink`**: determines how much a flex item will shrink relative to other flex items.
3. **`flex-basis`**: defines the default size of a flex item before any remaining space is distributed.
4. **`flex`**: shorthand property for **`flex-grow`**, **`flex-shrink`**, and **`flex-basis`**.
5. **`align-self`**: allows a flex item to override the **`align-items`** value for its parent.
6. **`order`**: determines the order in which a flex item appears within its container. By default, all items have a value of 0.

*/ 



/*
! grid
### **grid parent:**

1. **`display: grid;`** - This sets the display type of the container to grid.
2. **`grid-template-columns:`** - This sets the number and size of columns in the grid.
3. **`grid-template-rows:`** - This sets the number and size of rows in the grid.
4. **`grid-template-areas:`** - This creates named grid areas to place grid items into.
5. **`grid-gap:`** - This sets the size of the gap between grid items.
6. **`grid-auto-columns:`** - This sets the default size of columns that are not explicitly defined in the grid.
7. **`grid-auto-rows:`** - This sets the default size of rows that are not explicitly defined in the grid.
8. **`justify-items:`** - This sets the horizontal alignment of grid items within their cells.
9. **`align-items:`** - This sets the vertical alignment of grid items within their cells.
10. **`justify-content:`** - This sets the horizontal alignment of the grid within its container.
11. **`align-content:`** - This sets the vertical alignment of the grid within its container
12. including **`grid-template-rows`**, **`grid-template-columns`**, **`grid-template-areas`**, **`grid-auto-rows`**, **`grid-auto-columns`**, and **`grid-auto-flow`**.
- **`grid-auto-flow`**: This sets the order in which grid items are placed into the grid, either by row or by column.

### **grid child:**

1. **`grid-column-start:`** - This sets the starting column of a grid item.
2. **`grid-column-end:`** - This sets the ending column of a grid item.
3. **`grid-row-start:`** - This sets the starting row of a grid item.
4. **`grid-row-end:`** - This sets the ending row of a grid item.
5. **`grid-column:`** - This sets both the starting and ending columns of a grid item.
6. **`grid-row:`** - This sets both the starting and ending rows of a grid item.
7. **`grid-area:`** - This places a grid item into a named grid area.
8. **`justify-self:`** - This sets the horizontal alignment of a grid item within its cell.
9. **`align-self:`** - This sets the vertical alignment of a grid item within its cell.
- **`order`**: This sets the order in which a grid item is displayed within the grid.
- **`grid-column-gap`**: This sets the size of the gap between columns in a grid item.
- **`grid-row-gap`**: This sets the size of the gap between rows in a grid item.
- **`grid-gap`**: This sets the size of the gap between both columns and rows in a grid item.

---

- gird template columns: the number of columns with their widths*/ 

/*
! animation
- transition: property duration timing-function delay; (you can use only time like 3s or 3000ms)
- transform: scale(x, y), scale(1) scale(2)
- transform: translate(x, y) , translate(200px, 100px)
- transform: skew(), skewX(), skewY()
- transform-origin: X Y Z; %, top left center …. ⇒ where you want it to rotate



@keyframes slideIn {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}


.slide-in {
    width: 200px;
    height: 100px;
    background-color: blue;
    animation: slideIn 1s ease-in-out;
}
*/ 



/*
! media queries
Small 
@media (min-width: 768px) {
    .container {
    width: 750px;
    }
}

Medium 
@media (min-width: 992px) {
    .container {
    width: 970px;
    }
}
Large 
@media (min-width: 1200px) {
    .container {
    width: 1170px;
    }
}
Larger screens 
@media only screen 
and (min-width : 1824px) {
}
--------------------------------------------------------
* ANOTHER WAY:
@media (min-width: 1200px) and (max-width: 1800px) {
    body {}
}
@media (1600px <= width <= 1800px) {
    body {}
}
*/ 