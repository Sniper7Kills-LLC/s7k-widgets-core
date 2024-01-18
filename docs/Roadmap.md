# Roadmap

## Legend

- ⭐ - Low Priority
- ⭐⭐ - Medium Priority
- ⭐⭐⭐ - High Priority
- ❓ - Idea/Comment / Question how to achieve
- 🚧 - Some work has been completed.
- ✅ - Completed
- **BOLD** - Expected difficulty Level

## Style Improvements

- [X] ✅**HARD** - Fix Grid Style Interactions with Other Components
    - [X] ✅Ensure PopOvers, Dropdowns, Selects appear OVER the grid
    - [X] ✅Ensure widgets remain draggable, deletable, and modifiable
        ( The following CSS "fixes" the previous issue; but introduces this issue. `#GridLayout { z-index: -1 !important; }` )
- [ ] ⭐**MEDIUM** - Ability to have vertical or horizontal tabs based on layout
- [ ] ⭐⭐**Improve Drag/Drop Experience**
    - [ ] **EASY** - Mouse Icon
    - [ ] **HARD** - Drag/Drop Location Preview on Grid (Preview can be a color for user reference)
- [ ] ⭐**MEDIUM** - Style Customization
    - [ ] Provide ability for style to be overridden by application developers (similar to NuxtUI)
    - [ ] Ability to pass styles from plugin options
    - [ ] Ability to pass styles via props
- [ ] ⭐⭐**MEDIUM** - General Style Improvements
    - [ ] Open-Ended - Enhance UI using TailwindCSS with flexibility
    - [ ] Ensure default styles are dark/light mode compatible

## Functionality Improvements

### General
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

### Layouts
- [ ] ⭐**EASY** - Ability to specify number of columns for a layout
- [ ] ⭐**EASY** - Ability to enable/disable Tabs for a layout
- [ ] ⭐**HARD** - Expand layout flexability
    - [ ] Ability to use a single `WidgetGrid` in an application view
    - [ ] Ability to use a single `WidgetTabs` in an application view
    - [ ] Ability to use multiple `WidgetGrid`s in an application view
    - [ ] Ability to use multiple `WidgetGrid`s and a single `WidgetTab` in an application view

### Components
- [ ] ⭐**HARD** - Refactor to allow the use of the Grid or Tabs component without using the Page component.
    ( Currently the project is designed to only support the use of the Page component in Applications )
    - [ ] Provide support for the Tabs or Grid component to be used on their own and still retain expected functionaility
    - [ ] May require making additional components avilable from the plugin
    - ❓Related to `⭐**HARD** - Expand layout flexability`
- [ ] ⭐⭐**MEDIUM** - Refactor to allow the `components/widgets/Add.vue` component to exist outside of default components.
    - [ ] Displayed as a horizontal sticky bar by default (current functionality)
        - [ ] Add scrollbar for X overflow
    - [ ] ❓ Allow it to be modified to fit the application 
        - Use a prop to disable default behavior
        - Can be positioned outside of any WidgetGrid location
        - I.E. Displayed in a slide-over (https://tailwindui.com/components/application-ui/overlays/slide-overs)
        - Styled by application; not this package
        - May just be part of StyleCustomization task

### ✅ Widgets
- [x] ✅⭐⭐⭐**MEDIUM** - Ability to use Widgets not included in plugin or application plugin is used in
    - [x] Modify `ManagedWidget` to allow a string (url) to be used instead of a component for its definition
    - [x] Load the script if `as` is a string
    - [x] Ability to save plugin as Base64
- [x] ✅⭐⭐**MEDIUM** - Ability for widgets to provide customized edit screen for settings
    - [x] ✅Use JSON editor by default / not provided
    - [x] ✅Custom Form & logic to update widget settings/props possible within widget
- [x] ✅⭐⭐**MEDIUM** - Refactor method of adding widgets to grids
    - [x] ✅Assign an ID to every grid
    - [x] ✅Modify `components/Widgets/Add.vue` to identify which grid is being used based on the following item
    - [x] ✅Modify `components/Grid.vue` to assign a property or tag to be used in previous item to specify the ID of the grid being displayed.
- [x] ✅⭐**EASY** - Add thumbnail to `ManagedWidget`
    - [x] ✅ Update Type
    - [x] ✅ Use thumnail in `components/Widgets/Add.vue`
    - [x] ✅ Use/Generate default if not provided
        - [x] I.E. use `https://placehold.co/600x400?text=Hello+World` and display the name of the widget

### ✅ Tabs
- [x] ✅⭐**EASY** - Ability to Rename Tabs
- [x] ✅⭐**MEDIUM** - Ability to Reorder Tabs (preferably drag & drop, but OK with buttons)

## Tests
- [ ] ⭐⭐**HARD** - Unit Tests
    - [ ] WidgetManager
    - [ ] LayoutManager
- [ ] ⭐**HARD** - E2E Tests
    - [ ] User can register widget
    - [ ] ...?