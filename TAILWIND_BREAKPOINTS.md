# Tailwind CSS Breakpoints & Utility Classes

## 📱 Breakpoints Configuration

### Default Breakpoints
```javascript
screens: {
  'xs': '475px',    // Extra small devices (phones)
  'sm': '640px',    // Small devices (large phones)
  'md': '768px',    // Medium devices (tablets)
  'lg': '1024px',   // Large devices (laptops)
  'xl': '1280px',   // Extra large devices (desktops)
  '2xl': '1536px',  // 2X large devices (large desktops)
}
```

### Usage Examples

#### Responsive Grid
```html
<!-- 1 column on mobile, 2 on tablet, 3 on laptop, 4 on desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Grid items -->
</div>
```

#### Responsive Text
```html
<!-- Small on mobile, base on tablet, large on desktop -->
<h1 class="text-sm sm:text-base lg:text-lg">Responsive Title</h1>

<!-- Using custom utility classes -->
<h1 class="text-responsive">Responsive Title</h1>
<h1 class="text-responsive-lg">Large Responsive Title</h1>
<h1 class="text-responsive-xl">Extra Large Responsive Title</h1>
```

#### Responsive Flexbox
```html
<!-- Column on mobile, row on tablet+ -->
<div class="flex flex-col sm:flex-row items-center gap-4">
  <!-- Flex items -->
</div>

<!-- Using custom utility classes -->
<div class="flex-responsive-center gap-responsive">
  <!-- Flex items -->
</div>
```

#### Responsive Spacing
```html
<!-- Different padding for different screen sizes -->
<div class="p-4 sm:p-6 lg:p-8">
  <!-- Content -->
</div>

<!-- Using custom utility classes -->
<div class="p-responsive">
  <!-- Content -->
</div>
```

## 🎨 Custom Utility Classes

### Responsive Containers
```css
.container-responsive {
  @apply w-full mx-auto px-4 sm:px-6 lg:px-8;
  max-width: 1280px;
}
```

### Responsive Text Classes
```css
.text-responsive {
  @apply text-sm sm:text-base lg:text-lg;
}

.text-responsive-lg {
  @apply text-base sm:text-lg lg:text-xl xl:text-2xl;
}

.text-responsive-xl {
  @apply text-lg sm:text-xl lg:text-2xl xl:text-3xl;
}
```

### Responsive Grid Classes
```css
.grid-responsive {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}

.grid-responsive-2 {
  @apply grid grid-cols-1 lg:grid-cols-2;
}
```

### Responsive Flex Classes
```css
.flex-responsive {
  @apply flex flex-col sm:flex-row;
}

.flex-responsive-center {
  @apply flex flex-col sm:flex-row items-center;
}
```

### Responsive Spacing Classes
```css
.space-responsive {
  @apply space-y-4 sm:space-y-6 lg:space-y-8;
}

.gap-responsive {
  @apply gap-4 sm:gap-6 lg:gap-8;
}

.p-responsive {
  @apply p-4 sm:p-6 lg:p-8;
}

.px-responsive {
  @apply px-4 sm:px-6 lg:px-8;
}

.py-responsive {
  @apply py-4 sm:py-6 lg:py-8;
}
```

## 🎭 Component Classes

### Card Styles
```css
.card-responsive {
  @apply bg-white rounded-lg shadow-soft p-4 sm:p-6 lg:p-8;
}

.card-hover {
  @apply transition-all duration-300 hover:shadow-medium hover:-translate-y-1;
}
```

### Button Styles
```css
.btn-responsive {
  @apply px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}
```

### Form Styles
```css
.form-input-responsive {
  @apply w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

.form-label-responsive {
  @apply block text-sm sm:text-base font-medium text-gray-700 mb-2;
}
```

### Table Styles
```css
.table-responsive {
  @apply w-full text-sm sm:text-base;
}

.table-responsive th {
  @apply px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider;
}

.table-responsive td {
  @apply px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900;
}
```

## 🎬 Animation Classes

### Custom Animations
```css
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out;
}
```

## 🎨 Color Palette

### Primary Colors
```css
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
}
```

### Gray Colors
```css
gray: {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
}
```

## 📐 Spacing Scale

### Custom Spacing
```css
spacing: {
  '18': '4.5rem',
  '88': '22rem',
  '128': '32rem',
}
```

## 🎯 Best Practices

### 1. Mobile-First Approach
Always start with mobile styles and then add larger screen styles:
```html
<!-- ✅ Good -->
<div class="text-sm sm:text-base lg:text-lg">

<!-- ❌ Avoid -->
<div class="text-lg lg:text-base sm:text-sm">
```

### 2. Use Custom Utility Classes
Prefer custom utility classes for common patterns:
```html
<!-- ✅ Good -->
<div class="flex-responsive-center gap-responsive">

<!-- ❌ Avoid -->
<div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
```

### 3. Consistent Spacing
Use responsive spacing classes for consistency:
```html
<!-- ✅ Good -->
<div class="p-responsive">

<!-- ❌ Avoid -->
<div class="p-4 sm:p-6 lg:p-8">
```

### 4. Responsive Typography
Use responsive text classes for better readability:
```html
<!-- ✅ Good -->
<h1 class="text-responsive-lg">Title</h1>
<p class="text-responsive">Content</p>

<!-- ❌ Avoid -->
<h1 class="text-xl">Title</h1>
<p class="text-base">Content</p>
```

## 🔧 Usage in Components

### Example: Dashboard Card
```html
<div class="card-responsive card-hover animate-fade-in-up">
  <h3 class="text-responsive-lg font-semibold mb-4">Card Title</h3>
  <p class="text-responsive text-gray-600">Card content goes here...</p>
  <button class="btn-responsive btn-primary mt-4">Action</button>
</div>
```

### Example: Form Layout
```html
<form class="space-responsive">
  <div class="flex-responsive-center gap-responsive">
    <div class="w-full lg:w-1/2">
      <label class="form-label-responsive">Name</label>
      <input type="text" class="form-input-responsive" />
    </div>
    <div class="w-full lg:w-1/2">
      <label class="form-label-responsive">Email</label>
      <input type="email" class="form-input-responsive" />
    </div>
  </div>
  <button type="submit" class="btn-responsive btn-primary">Submit</button>
</form>
```

### Example: Data Table
```html
<div class="overflow-x-auto">
  <table class="table-responsive">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>
          <button class="btn-responsive btn-secondary">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
``` 