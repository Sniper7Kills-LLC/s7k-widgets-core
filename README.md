# vue3-widget-pages

This project provides a widget based grid system to Vue3 based projects.

While this project does not include any widgets they can easily be created in your own applications, imported from third party packages.

-----------------

## Roadmap / TODO List

- [ ] GUI / Style Improvements
    - [ ] Improve drag/drop experience
        - [ ] EASY - Mouse Icon
        - [ ] HARD - Drag/Drop Location Preview on Grid (Preview can just be a color not the actual widget so the user knows where the new widget will land)
    - [ ] MEDIUM - Ability to have virtical or horizontal based tabs based on layout
    - [ ] HARD - Fix Grid Style interactions with other components
        - [ ] Ensure PopOvers,Dropdowns,Selects apear OVER the grid
        - [ ] Ensure that widgets are still draggable, deletable, modifyable 
            ( The following CSS "fixes" the previous issue; but introduces this issue.
            `#GridLayout { z-index: -1 !important; }` )
    - [ ] MEDIUM - General Style Improvements
        - [ ] Open-Ended - The UI is currently put together using different snippets and examples using TailwindCSS; Use personal and professional judgement to enhance the UI while allowing maxium flexability
        - [ ] Ensure default styles are Dark/Like mode compatable
    - [ ] MEDIUM - Style Customization
        - [ ] Provide ability for style to be over wrote by application developers similar to NuxtUI
        - [ ] Ability to pass styles from plugin options
        - [ ] Ability to pass styles via props

- [ ] Functionality Improvements
    - [ ] HARD - Ability to import Widgets from GUI by End-User
    - [ ] EASY - Ability to import / export layouts from the GUI
        - [ ] Export
            - [ ] Allow user to select which saved layouts to export
            - [ ] Allow user to rename layouts during export
            - [ ] JSON like file
            - [ ] Layouts from any page can be exported; even if not on that page.
        - [ ] Import
            - [ ] Ability to select which layouts to import
            - [ ] Does not over-write existing layouts w/ modifications
    - [ ] EASY - Ability to rename Tabs
    - [ ] MEDIUM - Ability to reorder Tabs (Drag & Drop prefered; but OK with buttons)

- [ ] Developer Experience
    - [ ] MEDIUM - Create a Widget Development Repository
        - [ ] Playground for previewing widgets during development
            - [ ] Dark/Light mode compatable
            - [ ] Uses This package in playground for widget interactions
        - [ ] Ability to build widgets
            - [ ] For 3rd party NPM packages imported via PluginOptions
            - [ ] For End-User based Import
        - [ ] Ability to maintain several widgets in single repository
    - [ ] EASY - Export Type definitions in this package

-----------------

## Installation
1) Install the Project
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
1) Use it in your application
    ```html
    <template>
        <WidgetsPage page="[PAGE_NAME]" :default-layouts="layouts"></WidgetsPage>
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

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
