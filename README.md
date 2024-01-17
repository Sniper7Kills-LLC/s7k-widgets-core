# widgets-core

This project provides a widget-pased grid system to Vue3 based applications.



-----------------

## Roadmap / TODO List

---

**Legend:**
- ⭐ - Low Priority
- ⭐⭐ - Medium Priority
- ⭐⭐⭐ - High Priority
- ❓ - Idea/Comment / Question how to achieve
- 🚧 - Some work has been completed.
- ✅ - Completed
- **BOLD** - Expected difficulty Level

---

- [ ] **GUI / Style Improvements**
    - [ ] ⭐⭐**Improve Drag/Drop Experience**
        - [ ] **EASY** - Mouse Icon
        - [ ] **HARD** - Drag/Drop Location Preview on Grid (Preview can be a color for user reference)
    - [ ] ⭐**MEDIUM** - Ability to have vertical or horizontal tabs based on layout
    - [ ] ⭐⭐**MEDIUM** - Refactor to allow the `components/widgets/Add.vue` component to exist outside of default components.
        - [ ] Displayed as a horizontal sticky bar by default (current functionality)
            - [ ] Add scrollbar for X overflow
        - [ ] ❓ Allow it to be modified to fit the application 
            - Use a prop to disable default behavior
            - Can be positioned outside of any WidgetGrid location
            - I.E. Displayed in a slide-over (https://tailwindui.com/components/application-ui/overlays/slide-overs)
            - Styled by application; not this package
            - May just be part of StyleCustomization task
    - [X] ✅**HARD** - Fix Grid Style Interactions with Other Components
        - [X] ✅Ensure PopOvers, Dropdowns, Selects appear OVER the grid
        - [X] ✅Ensure widgets remain draggable, deletable, and modifiable
            ( The following CSS "fixes" the previous issue; but introduces this issue.
            `#GridLayout { z-index: -1 !important; }` )
    - [ ] ⭐⭐**MEDIUM** - General Style Improvements
        - [ ] Open-Ended - Enhance UI using TailwindCSS with flexibility
        - [ ] Ensure default styles are dark/light mode compatible
    - [ ] ⭐**MEDIUM** - Style Customization
        - [ ] Provide ability for style to be overridden by application developers (similar to NuxtUI)
        - [ ] Ability to pass styles from plugin options
        - [ ] Ability to pass styles via props

- [ ] **Functionality Improvements**
    - [ ] GENERAL
        - [ ] ⭐⭐**HARD** - General Improvements to preformance and logic (I'm not a developer by trade; I think this repository helps prove that)
        - [x] ✅⭐⭐⭐**HARD** - Ability to Import Widgets from GUI by End-User
        - [x] ✅⭐⭐⭐**EASY** - Ability to Import/Export Layouts from the GUI
            - [x] ✅**Export**
                - [x] Allow user to select which saved layouts to export
                - [x] Allow user to rename layouts during export
                - [x] JSON-like file
                - [x] Layouts from any page can be exported, even if not on that page
            - [x] ✅**Import**
                - [x] Ability to select which layouts to import
                - [x] Does not overwrite existing layouts with modifications
    - [ ] Widgets
        - [x] ✅⭐⭐⭐**MEDIUM** - Ability to use Widgets not included in plugin or application plugin is used in
            - [x] Modify `ManagedWidget` to allow a string (url) to be used instead of a component for its definition
            - [x] Load the script if `as` is a string
            - [x] Ability to save plugin as Base64
        - [ ] ⭐⭐**MEDIUM** - Ability for widgets to provide customized edit screen for settings
            - [ ] Use JSON editor by default / not provided
            - [ ] Custom Form & logic to update widget settings/props possible within widget
        - [x] ✅⭐⭐**MEDIUM** - Refactor method of adding widgets to grids
            - [x] ✅Assign an ID to every grid
            - [x] ✅Modify `components/Widgets/Add.vue` to identify which grid is being used based on the following item
            - [x] ✅Modify `components/Grid.vue` to assign a property or tag to be used in previous item to specify the ID of the grid being displayed.
        - [ ] ⭐**EASY** - Add thumbnail to `ManagedWidget`
            - [ ] Update Type
            - [ ] Use thumnail in `components/Widgets/Add.vue`
            - [ ] Use/Generate default if not provided
                - [ ] I.E. use `https://placehold.co/600x400?text=Hello+World` and display the name of the widget
    - [ ] Layouts
        - [ ] ⭐**EASY** - Ability to specify number of columns for a layout
        - [ ] ⭐**EASY** - Ability to enable/disable Tabs for a layout
        - [ ] ⭐**HARD** - Expand layout flexability
            - [ ] Ability to use a single `WidgetGrid` in an application view
            - [ ] Ability to use a single `WidgetTabs` in an application view
            - [ ] Ability to use multiple `WidgetGrid`s in an application view
            - [ ] Ability to use multiple `WidgetGrid`s and a single `WidgetTab` in an application view
    - [x] ✅ Tabs
        - [x] ✅⭐**EASY** - Ability to Rename Tabs
        - [x] ✅⭐**MEDIUM** - Ability to Reorder Tabs (preferably drag & drop, but OK with buttons)
    - [ ] Components
        - [ ] ⭐**HARD** - Refactor to allow the use of the Grid or Tabs component without using the Page component.
            ( Currently the project is designed to only support the use of the Page component in Applications )
            - [ ] Provide support for the Tabs or Grid component to be used on their own and still retain expected functionaility
            - [ ] May require making additional components avilable from the plugin
            - ❓Related to `⭐**HARD** - Expand layout flexability`

- [ ] **Developer Experience**
    - [ ] ⭐⭐**EASY** - Provide Github Workflow(s)
        - [ ] Runs any unit and E2E tests
        - [ ] Builds Package
        - [ ] Publishes to github
        - [ ] Publishes to NPM package to Packagist
    - [ ] 🚧⭐⭐⭐**MEDIUM** - Create a Widget Development Repository
        - [ ] Playground for previewing widgets during development
            - [ ] Dark/light mode compatible
            - [ ] Uses this package in the playground for widget interactions
        - [ ] 🚧 Ability to build widgets
            - [ ] Default Github Workflow(s)
            - [ ] 🚧 For 3rd party NPM packages imported via PluginOptions
            - [x] ✅ For End-User-based Import
                - [x] File used for importing widgets should contain the definition of the widget(s) (name, height, width, etc.) along with anything required for the widget to be displayed (compiled script, script url, etc...)
        - [ ] Ability to maintain several widgets in a single repository
    - [ ] ⭐**EASY** - Export Type Definitions in This Package
    - [ ] ⭐**MEDIUM** - Create documentation site
        - [ ] Github Workflow to build + publish
        - [ ] Host on Github Pages
        - [ ] Describe Components
            - [ ] Props
            - [ ] Slots
            - [ ] Examples
        - [ ] Describe Mangers
            - [ ] Widget
            - [ ] Layout
        - [ ] Describe Types
            - [ ] ManagedWidget
            - [ ] LayoutWidget
            - [ ] LayoutTabs
            - [ ] LayoutPage

- [ ] **Tested Production Ready**
    - [ ] ⭐⭐**HARD** - Unit Tests
        - [ ] WidgetManager
        - [ ] LayoutManager
    - [ ] ⭐**HARD** - E2E Tests
        - [ ] User can register widget
        - [ ] ...?

-----------------

## Installation

### Nuxt

1) Install the Package
    ```cli
    npm install [PACKAGE_NAME]
    ```
1) Create a Nuxt Plugin
    ```typescript
    // plugins/widgets.client.ts

    // Import Plugin and Plugin Options Type
    import { WidgetsPlugin, WidgetsPluginOptions } from "[PACKAGE_NAME]";

    // Import your Application widgets
    import WidgetDivider from "./components/Divider.vue";

    // Define the Plugin Options
    const WidgetsPluginOptions: WidgetsPluginOptions = {
        // Define Widgets installed in your application
        widgets: [
            // Application Divider Widget
            {
                name: "Divider", // Widget Name
                id: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b", // Widget ID
                as: WidgetDivider, // Imported Widget
                defaultProps: { label: "Divider Label" }, // Properties / Settings for the Widget
                height: 1, // Default Widget Height
                width: 3, // Default Widget Widget
                pages: [".*"], // List of pages this widget is available to (Regex based matching)
            },
            // Standalone Widget Example (This is the same as an End-User Import)
            {
                name: "Custom",  // Widget Name
                id: "f634771b-2fef-4ae7-a61a-cd28b6ab4e2c", // Widget ID
                as: "https://gist.githack.com/sniper7kills/6b42ba3125724c5709f604e90379e18f/raw/0f0a9c529cbfb00688eee0546958a106c036273c/TestWidget.umd.min.js", // URL to JS file (umd.min.js expected)
                defaultProps: { message: "Custom Message" }, // Properties / Settings for the Widget
                pages: [".*"],
            },
        ],
    };

    // Define the Nuxt Plugin
    export default defineNuxtPlugin((nuxtApp) => {
        // Register the Plugin in Nuxt
        nuxtApp.vueApp.use(WidgetsPlugin, WidgetsPluginOptions);
    })
    ```

1) Follow Usage Instructions

### Vue3

1) Install the Package
    ```cli
    npm install [PACKAGE_NAME]
    ```
1) Add it to your application
    ```ts
    // Default Vue Imports
    import { createApp } from "vue";
    import App from "./App.vue";

    // Other Imports ...

    // Import the Widget Plugin and Options Type Definition
    import { WidgetsPlugin, WidgetsPluginOptions } from "[PACKAGE_NAME]";

    // Import your Application widgets
    import WidgetDivider from "./components/Divider.vue";

    // Define the Plugin Options
    const WidgetsPluginOptions: WidgetsPluginOptions = {
        // Define Widgets installed in your application
        widgets: [
            // Application Divider Widget
            {
                name: "Divider", // Widget Name
                id: "a6d8771b-2eef-4ae7-a61a-cd28a6ab4e3b", // Widget ID
                as: WidgetDivider, // Imported Widget
                defaultProps: { label: "Divider Label" }, // Properties / Settings for the Widget
                height: 1, // Default Widget Height
                width: 3, // Default Widget Widget
                pages: [".*"], // List of pages this widget is available to (Regex based matching)
            },
        ],
    };

    // Register the plugin with your defined options
    app.use(WidgetsPlugin, WidgetsPluginOptions);

    // Other Code ...

    app.mount("#app");
    ```

## Usage

Currently only the `WidgetsPage` component is fully functional.
In the future just the `WidgetsGrid` and `WidgetsTab` components will be able to be used seperatly.

### WidgetPage

```html
<template>
    <!-- Header Content -->
    <WidgetsPage page="[PAGE_NAME]" :default-layouts="layouts"></WidgetsPage>
    <!-- Footer Content -->
</template>
<script setup lang="ts">
    // Import LayoutPage type
    import { LayoutPage } from "[PACKAGE_NAME]";
    import { v4 as uuidv4 } from "uuid";
    // NOTE: This can be defined and imported from a seperate file.
    const layouts: LayoutPage[] = [
        {
            id: "0000-000-000-0000", // ID of the Layout
            name: "Test Page", // Name of the layout
            default: false, // If this is the default non-saved layout
            // The widget Grid
            grid: [
              // A single widget on the grid
              {
                name: "Empty Widget", // Name of the Widget
                widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff", // The widget ID as defined in the WidgetsPluginOptions
                x: 0, // widget X position
                y: 0, // widget Y position
                w: 1, // widget column width
                h: 1, // widget row height
                i: uuidv4(), // ID of this widget layout)
                moved: false, // default value
              },
            ],
            hasTabs: true, // If this layout has Tabs enabled
            // The tabs for this layout
            tabs: [
                // A single Tab
                {
                    id: uuidv4(), // the ID of this tab
                    name: "First Tab", // the name of this tab
                    // The widget grid for this tab
                    grid: [
                        // A single widget on the grid. Same as previous example
                        {
                            name: "Empty Widget",
                            widgetID: "d287d3bc-94e9-4b6d-91ce-ef4bfced75ff",
                            x: 0,
                            y: 0,
                            w: 1,
                            h: 1,
                            i: uuidv4(),
                            moved: false,
                        },
                    ]
                }
            ],
        } as LayoutPage,
    ];
</script>
<style></style>
```

-----------------

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
