
# Changelog

## v1.1.0

### Added

- Zustand stores for app data and user data
- Basic set of tests
- A couple of playwright tests
- GitHub CI workflow, run tests in jobs

### Changed

- Removed context and now using Zustand stores
- Updated package.json to add new dependencies and devDependencies
- Updated package.json scripts for dev, build, preview, test, and test-playwright

## v1.0.0

### Added

- Initial app setup with React
    - Browse, search and sort posts, comments, albums, photos, and users
    - Create, edit, and delete posts, comments, albums, photos, and users
    - Protected routes that require authentication
    - Infinite scrolling of posts and photos