import { createRouter, createWebHistory } from 'vue-router';

// 1. Import your View components
import IdentifierView from '@/views/IdentifierView.vue';
import FlowchartView from '@/views/FlowchartView.vue';
import AboutView from '@/views/AboutView.vue';

const router = createRouter({
    // 2. Configure the history mode for clean URLs
    // 'createWebHistory' is standard for modern single-page applications
    history: createWebHistory(import.meta.env.BASE_URL),
    
    // 3. Define the routes array
    routes: [
        {
            // The URL path
            path: '/', 
            // A name for programmatic navigation (e.g., router.push({ name: 'home' }))
            name: 'home', 
            // The component that should be rendered in <RouterView> when this path is active
            component: IdentifierView,
            meta: { title: "Identifier | Turtle Identifier" }
        },
        {
            path: '/flowchart',
            name: 'flowchart',
            component: FlowchartView,
            meta: { title: "Flowchart | Turtle Identifier" }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            meta: { title: "About | Turtle Identifier" }
        }
    ]
});

// src/router/index.js (After the router definition)

// This hook runs after every successful navigation
router.afterEach((to) => {
    // Check if the route has a 'title' defined in its meta field
    if (to.meta.title) {
        // Set the document title to the value from the route's meta field
        document.title = to.meta.title;
    } else {
        // Set a default fallback title if a route somehow misses the meta field
        document.title = "Turtle Identifier"; 
    }
});

export default router;