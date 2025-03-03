# Storybook Stories for Mini MUI Table

This directory contains Storybook stories for all components and demos in the Mini MUI Table project.

## Directory Structure

- `/table`: Stories for the core table components

  - `Table.stories.tsx`: Basic table component stories
  - `TablePagination.stories.tsx`: Pagination component stories
  - `CompleteTable.stories.tsx`: Full-featured table with all capabilities

- `/demos`: Stories for the demo implementations

  - `UserTable.stories.tsx`: User table demo
  - `PhotoTable.stories.tsx`: Photo table with image thumbnails
  - `CustomFiltersDemo.stories.tsx`: Demo showcasing custom filtering
  - `CustomFilters.stories.tsx`: The custom filters component in isolation

- `/layout`: Stories for layout components

  - `Navigation.stories.tsx`: Navigation component

- `/theme`: Stories for theme-related components
  - `ThemeToggle.stories.tsx`: Theme toggle component

## Running Storybook

To run Storybook locally:

```bash
npm run storybook
```

This will start Storybook on port 6006. You can then access it at http://localhost:6006.

## Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

This will create a static build in the `storybook-static` directory.

## Adding New Stories

When adding new components, please create corresponding stories in the appropriate directory. Follow the existing patterns for consistency.
